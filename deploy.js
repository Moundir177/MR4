const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  sourceDir: './.next',
  outputDir: './out',
  publicDir: './public',
  zipName: 'mira-academy-site.zip',
  excludeFromCopy: ['.DS_Store', 'Thumbs.db', '.git', 'node_modules'],
  deploymentTools: ['server.js', 'README.md', 'package.json', '.htaccess', '_redirects', 'deploy.js']
};

// Main function
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  switch (command) {
    case 'build':
      await buildStaticSite();
      break;
    case 'zip':
      await createZipArchive();
      break;
    case 'clean':
      await cleanOutput();
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

// Build the static website
async function buildStaticSite() {
  console.log('🚀 Creating static site export...');
  
  try {
    // Ensure output directory exists
    await fs.ensureDir(config.outputDir);
    
    // Clean the output directory
    await cleanOutput();
    
    // Copy public files
    console.log('📂 Copying public files...');
    try {
      await fs.copy(config.publicDir, config.outputDir, {
        filter: (src) => {
          const basename = path.basename(src);
          return !config.excludeFromCopy.includes(basename);
        }
      });
      console.log('✅ Public files copied successfully');
    } catch (err) {
      console.error('❌ Error copying public files:', err.message);
    }
    
    // Copy .next/static to out/_next/static
    console.log('📂 Copying Next.js static assets...');
    try {
      const staticDir = path.join(config.sourceDir, 'static');
      const outStaticDir = path.join(config.outputDir, '_next/static');
      
      if (fs.existsSync(staticDir)) {
        await fs.ensureDir(outStaticDir);
        await fs.copy(staticDir, outStaticDir);
        console.log('✅ Next.js static assets copied successfully');
      } else {
        console.error(`❌ Static directory not found: ${staticDir}`);
      }
    } catch (err) {
      console.error('❌ Error copying Next.js static assets:', err.message);
    }
    
    // Create deployment tools if they don't exist in out directory
    for (const tool of config.deploymentTools) {
      const sourcePathInOut = path.join('out', tool);
      const destPath = path.join(config.outputDir, tool);
      
      try {
        // Check if the file exists in the out template directory
        if (fs.existsSync(sourcePathInOut)) {
          // Copy it to the output directory
          console.log(`📝 Adding deployment file: ${tool}`);
          await fs.copy(sourcePathInOut, destPath);
        }
      } catch (err) {
        console.error(`❌ Error copying deployment tool ${tool}:`, err.message);
      }
    }
    
    // Copy index.html if it's not being copied elsewhere
    const indexHtmlSrc = path.join('out', 'index.html');
    const indexHtmlDest = path.join(config.outputDir, 'index.html');
    
    if (!fs.existsSync(indexHtmlDest) && fs.existsSync(indexHtmlSrc)) {
      try {
        console.log('📝 Adding index.html...');
        await fs.copy(indexHtmlSrc, indexHtmlDest);
      } catch (err) {
        console.error('❌ Error copying index.html:', err.message);
      }
    }
    
    console.log('✅ Static site export completed!');
    console.log(`📁 Output directory: ${path.resolve(config.outputDir)}`);
    console.log('\nNext steps:');
    console.log('1. Run "node deploy.js zip" to create a deployable ZIP archive');
    console.log('2. Upload the generated files or ZIP to your web hosting provider');
    console.log('3. Make sure to configure your server to handle client-side routing');
    
  } catch (error) {
    console.error('❌ Error building static site:', error.message);
  }
}

// Create a zip archive for deployment
async function createZipArchive() {
  console.log(`📦 Creating deployment archive: ${config.zipName}...`);
  
  try {
    // Make sure output directory exists
    if (!fs.existsSync(config.outputDir)) {
      console.error(`❌ Error: Output directory "${config.outputDir}" not found. Run "node deploy.js build" first.`);
      return;
    }
    
    try {
      // Use a simple command line approach for cross-platform compatibility
      if (process.platform === 'win32') {
        execSync(`powershell Compress-Archive -Path "${config.outputDir}/*" -DestinationPath "${config.zipName}" -Force`, { stdio: 'inherit' });
      } else {
        execSync(`cd "${config.outputDir}" && zip -r "../${config.zipName}" .`, { stdio: 'inherit' });
      }
      
      console.log(`✅ Archive created: ${path.resolve(config.zipName)}`);
      const stats = fs.statSync(config.zipName);
      console.log(`📏 Archive size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    } catch (err) {
      console.error('❌ Error creating zip archive:', err.message);
      console.log('You may need to install the zip utility or use alternative compression tools.');
    }
    
  } catch (error) {
    console.error('❌ Error during zip creation:', error.message);
  }
}

// Clean the output directory
async function cleanOutput() {
  console.log(`🧹 Cleaning output directory: ${config.outputDir}...`);
  
  try {
    await fs.emptyDir(config.outputDir);
    console.log('✅ Output directory cleaned');
  } catch (error) {
    console.error('❌ Error cleaning output directory:', error.message);
  }
}

// Show help information
function showHelp() {
  console.log(`
MIRA ACADEMY Static Website Deployment Utility
=============================================

Usage:
  node deploy.js [command]

Commands:
  build    Create a static site export in the "${config.outputDir}" directory
  zip      Create a zip archive for deployment
  clean    Clean the output directory
  help     Show this help message

Examples:
  node deploy.js build   # Creates a static export in ${config.outputDir}/
  node deploy.js zip     # Creates ${config.zipName} file
  `);
}

// Run the main function
main().catch(error => {
  console.error('❌ Deployment error:', error.message);
}); 