<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" href="favicon.svg" sizes="any" type="image/svg+xml">

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">

        <!-- Inject Data -->
        @if(!is_null(Auth::user()))
            <script>
                window.ConvoyUser = {!! json_encode(Auth::user()->toReactObject()) !!};
            </script>
        @endif

        @if(!empty($siteConfiguration))
            <script>
                window.SiteConfiguration = {!! json_encode($siteConfiguration) !!};
            </script>
        @endif

        <!-- Scripts -->
        @viteReactRefresh
        @vite('resources/scripts/main.tsx')

        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F0PFRTBLR6"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-F0PFRTBLR6');

            gtag('event', 'meta', {
                'version': '{{ config('app.version') }}'
            });
        </script>
    </head>
    <body class="font-sans antialiased">
        <div id="root"></div>
    </body>
</html>
