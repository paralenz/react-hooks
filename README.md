# @paralenz/react-hooks
<!-- Please add a description here -->

## Installation
Yarn:
```sh
yarn add @paralenz/react-hooks
```
npm:
```sh
npm install @paralenz/react-hooks
```

## Prerequisites
You will need to have a `.npmrc` file in your project that tells npm to use the github package registry
```sh
echo "@paralenz:registry=https://npm.pkg.github.com/" > .npmrc
```

## Publish a new version
Publishing a new version has never been easier.

All you need to do is bump the version and merge your changes to the `master` branch.

This will fun the `publish.yml` workflow

You can either run `yarn version [major|minor|match]` or change the version in `package.json`