#!/usr/bin/env node
// Script pour installer les instructions Copilot dans un projet

const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
    console.log('❌ Usage: node install-instruction.js <project-path>');
    console.log('   Exemple: node install-instruction.js ../zfa_devops_timesheet');
    process.exit(1);
}

const projectPath = process.argv[2];
const scriptDir = __dirname;
const sourceFile = path.join(scriptDir, '.github', 'instructions', 'readme-template.instructions.md');
const targetDir = path.join(projectPath, '.github', 'instructions');
const targetFile = path.join(targetDir, 'readme-template.instructions.md');

// Vérifier que le fichier source existe
if (!fs.existsSync(sourceFile)) {
    console.error(`❌ Fichier source introuvable : ${sourceFile}`);
    process.exit(1);
}

// Créer le dossier s'il n'existe pas
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`✅ Dossier créé : ${targetDir}`);
}

// Copier le fichier
try {
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`✅ Instructions installées dans : ${projectPath}`);
    console.log(`📄 Fichier : ${targetFile}`);
} catch (error) {
    console.error(`❌ Erreur lors de la copie : ${error.message}`);
    process.exit(1);
}
