import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { useEffect, useState } from 'react';
import Loader from '@/Components/Loader';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
        `./Pages/${name}.tsx`,
        import.meta.glob('./Pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        function AppWrapper() {
        const [loading, setLoading] = useState(false);
            
        useEffect(() => {
            router.on('start', () => setLoading(true));
            router.on('finish', () => setLoading(false));

            return () => {
            router.on('start', null as any);
            router.on('finish', null as any);
            };
        }, []);

        return (
            <>
            {loading && <Loader />}
            <App {...props} />
            </>
        );
        }

        root.render(<AppWrapper />);
    },
    progress: {
        color: '#4B5563',
    },
});
