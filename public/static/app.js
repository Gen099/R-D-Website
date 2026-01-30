// Main JavaScript for Fotober R&D Hub

// Copy source files to accessible locations
async function loadDocuments() {
    try {
        const response = await fetch('/api/documents');
        const data = await response.json();
        console.log('Documents loaded:', data);
        return data.documents;
    } catch (error) {
        console.error('Error loading documents:', error);
        return [];
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('Fotober R&D Hub initialized');
    loadDocuments();
});
