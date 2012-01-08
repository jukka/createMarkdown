Create Markdown - Markdown editor based on Create
=================================================

TODO: Introduction

## Getting started

To start the example Markdown editing backend, run:

    npm start

This starts a simple HTTP service at localhost port 3000 for editing
Markdown files within this folder. For example, to edit this README.md file,
point your browser to `http://localhost:3000/README.md`.

To edit files in some folder, provide the path as the argument to the
`server.coffee` script:

    coffee server.coffee /path/to/markdown

You can also specify an alternative localhost port to be used:

    coffee server.coffee /path/to/markdown 8080

## Status

The code is still highly experimental. Use at your own risk and have
backups of any Markdown files you edit...

