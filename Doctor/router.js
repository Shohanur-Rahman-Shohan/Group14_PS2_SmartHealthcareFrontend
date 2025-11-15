export const router = {
    routes: {},
    rootElement: null,

    init: function(rootElementId) {
        this.rootElement = document.getElementById(rootElementId);
        if (!this.rootElement) {
            console.error(`Root element with ID '${rootElementId}' not found.`);
            return;
        }
    },

    addRoute: function(path, templatePath, callback = null) {
        this.routes[path] = { templatePath, callback };
    },

    navigate: function(path) {
        window.location.hash = path;
    },

    loadRoute: async function(hash) {
        const path = hash.replace(/^#/, '');
        const route = this.routes[path] || this.routes['/dashboard']; // Default to dashboard

        const templatePath = route.templatePath;

        if (!route) {
            console.error(`Route for path '${path}' not found.`);
            this.rootElement.innerHTML = `
                <div class="text-center py-10">
                    <h2 class="text-3xl font-bold text-red-600 mb-4">404 - Page Not Found</h2>
                    <p class="text-gray-700">The page you are looking for does not exist.</p>
                    <a href="#/dashboard" data-route="/dashboard" class="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">Go to Dashboard</a>
                </div>
            `;
            return;
        }

        try {
            const response = await fetch(templatePath);
            if (!response.ok) {
                throw new Error(`Failed to load template: ${response.statusText}`);
            }
            const html = await response.text();
            this.rootElement.innerHTML = html;

            if (route.callback) {
                route.callback();
            }
        } catch (error) {
            console.error('Error loading route:', error);
            this.rootElement.innerHTML = `
                <div class="text-center py-10">
                    <h2 class="text-3xl font-bold text-red-600 mb-4">Error Loading Page</h2>
                    <p class="text-gray-700">${error.message}</p>
                    <a href="#/dashboard" data-route="/dashboard" class="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">Go to Dashboard</a>
                </div>
            `;
        }
    }
};
