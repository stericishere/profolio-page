const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Test configuration
const testConfig = {
  baseUrl: 'http://localhost:3005',
  timeout: 30000,
  retries: 1,
  workers: 1 // Run sequentially for accurate performance measurements
};

// Test suites
const testSuites = [
  {
    name: 'Netflix Animation & Preloading',
    file: 'netflix-animation-preloading.spec.ts',
    description: 'Tests Netflix animation and data preloading functionality'
  },
  {
    name: 'Navigation Performance',
    file: 'navigation-performance.spec.ts',
    description: 'Tests navigation speed and performance after preloading'
  },
  {
    name: 'Error Handling & Fallbacks',
    file: 'error-handling-fallback.spec.ts',
    description: 'Tests error handling and fallback scenarios'
  },
  {
    name: 'User Workflow Journey',
    file: 'user-workflow-journey.spec.ts',
    description: 'Tests complete user journey from start to finish'
  }
];

// Results aggregator
class TestResultsAggregator {
  constructor() {
    this.results = {
      summary: {
        totalTests: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
        duration: 0
      },
      suites: [],
      performanceMetrics: {},
      issues: []
    };
  }

  addSuiteResult(suiteName, result) {
    this.results.suites.push({
      name: suiteName,
      ...result
    });
  }

  generateReport() {
    const reportPath = path.join(__dirname, 'test-results-summary.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    
    console.log('\n' + '='.repeat(60));
    console.log('🧪 NETFLIX PORTFOLIO TEST RESULTS SUMMARY');
    console.log('='.repeat(60));
    
    console.log(`\n📊 Overall Results:`);
    console.log(`   Total Tests: ${this.results.summary.totalTests}`);
    console.log(`   ✅ Passed: ${this.results.summary.passed}`);
    console.log(`   ❌ Failed: ${this.results.summary.failed}`);
    console.log(`   ⏭️  Skipped: ${this.results.summary.skipped}`);
    console.log(`   ⏱️  Duration: ${(this.results.summary.duration / 1000).toFixed(2)}s`);
    
    console.log(`\n📁 Test Suites:`);
    this.results.suites.forEach(suite => {
      const status = suite.failed > 0 ? '❌' : '✅';
      console.log(`   ${status} ${suite.name}: ${suite.passed}/${suite.total} passed`);
    });
    
    if (this.results.issues.length > 0) {
      console.log(`\n⚠️  Issues Found:`);
      this.results.issues.forEach((issue, index) => {
        console.log(`   ${index + 1}. ${issue}`);
      });
    }
    
    console.log(`\n📄 Full report saved to: ${reportPath}`);
    console.log('='.repeat(60));
  }
}

// Performance metrics extractor
function extractPerformanceMetrics(output) {
  const metrics = {};
  const lines = output.split('\n');
  
  lines.forEach(line => {
    // Extract navigation times
    const navMatch = line.match(/(\w+) navigation took (\d+)ms/i);
    if (navMatch) {
      metrics[`${navMatch[1].toLowerCase()}NavigationTime`] = parseInt(navMatch[2]);
    }
    
    // Extract preloading times
    const preloadMatch = line.match(/Preloading completed in (\d+)ms/i);
    if (preloadMatch) {
      metrics.preloadingTime = parseInt(preloadMatch[1]);
    }
    
    // Extract animation times
    const animMatch = line.match(/Netflix animation completed in (\d+)ms/i);
    if (animMatch) {
      metrics.animationTime = parseInt(animMatch[1]);
    }
    
    // Extract performance metrics
    const perfMatch = line.match(/loadTime.*?(\d+)ms/i);
    if (perfMatch) {
      metrics.pageLoadTime = parseInt(perfMatch[1]);
    }
  });
  
  return metrics;
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting Netflix Portfolio E2E Test Suite...');
  console.log(`🌐 Testing URL: ${testConfig.baseUrl}`);
  
  const aggregator = new TestResultsAggregator();
  const startTime = Date.now();
  
  // Check if dev server is running
  console.log('\n🔍 Checking if development server is running...');
  
  for (const suite of testSuites) {
    console.log(`\n📋 Running: ${suite.name}`);
    console.log(`   Description: ${suite.description}`);
    console.log(`   File: ${suite.file}`);
    
    try {
      const result = await runTestSuite(suite.file);
      const metrics = extractPerformanceMetrics(result.output);
      
      aggregator.addSuiteResult(suite.name, result);
      Object.assign(aggregator.results.performanceMetrics, metrics);
      
      aggregator.results.summary.totalTests += result.total;
      aggregator.results.summary.passed += result.passed;
      aggregator.results.summary.failed += result.failed;
      aggregator.results.summary.skipped += result.skipped || 0;
      
      if (result.failed > 0) {
        aggregator.results.issues.push(`${suite.name}: ${result.failed} test(s) failed`);
      }
      
    } catch (error) {
      console.error(`   ❌ Error running ${suite.name}: ${error.message}`);
      aggregator.results.issues.push(`${suite.name}: Failed to run - ${error.message}`);
    }
  }
  
  aggregator.results.summary.duration = Date.now() - startTime;
  aggregator.generateReport();
  
  return aggregator.results;
}

// Run individual test suite
function runTestSuite(testFile) {
  return new Promise((resolve, reject) => {
    const command = `npx playwright test ${testFile} --reporter=json`;
    
    exec(command, { cwd: path.dirname(__dirname) }, (error, stdout, stderr) => {
      if (error && !stdout.includes('"stats"')) {
        reject(error);
        return;
      }
      
      try {
        // Parse Playwright JSON output
        const jsonOutput = stdout.split('\n').find(line => line.includes('"stats"'));
        const result = jsonOutput ? JSON.parse(jsonOutput) : {};
        
        const stats = result.stats || {};
        
        resolve({
          total: stats.expected || 0,
          passed: stats.passed || 0,
          failed: stats.failed || 0,
          skipped: stats.skipped || 0,
          output: stderr + stdout
        });
        
      } catch (parseError) {
        // Fallback parsing from text output
        const passed = (stdout.match(/✓/g) || []).length;
        const failed = (stdout.match(/✗/g) || []).length;
        
        resolve({
          total: passed + failed,
          passed,
          failed,
          output: stderr + stdout
        });
      }
    });
  });
}

// Export for use as module
module.exports = {
  runTests,
  testSuites,
  TestResultsAggregator
};

// Run if called directly
if (require.main === module) {
  runTests()
    .then(results => {
      const exitCode = results.summary.failed > 0 ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('❌ Test runner failed:', error);
      process.exit(1);
    });
}