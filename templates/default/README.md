# Basic template

Hello and welcome to the basic fxhash template.

## First things

Thank you for using this boilerplate. If you have any questions or comments please hit me up on discord, email or twitter:

discord: Riamu#3930
twitter: @neuromantic6
email: liam@wethecollective.com

## Commands

```
$ npm start
```
This will open a webserver and will watch all of your files for changes and automatically update them

```
$ npm build
```
This will build your project to the dist folder, ready to be zipped and made into a token.

## Project structure

```
.
├── public            Contains any files you need to include in your dist folder that aren't explicitely referenced in src.
│   └── LICENCE.md    Add your licence information to this file, it will be included in the project root.
├── src               All of your source files shoudl go here, including any images you're referencing in your project
│   ├── index.html    The index HTML
│   └── index.js      Your boilerplate javascript. You can import other modules into this.
│   └── index.scss    This will compile to your CSS
└── dist              This is where your project will be compiled to
```

## Before you mint

### Testing

Make sure you test in all browsers, on a god variety of devices, at different pixel resolutions at different window sizes. Your token should ideally appear consistent across all.

### licencing

There are many different options available for licencing an NFT. The core components are that if you do not include a licence, the rights of the token have different properties in different regions, so you're better off adding a licence to your code.

In addition to this, make sure you also include any licences to any pre-existing code you're using, this includes frameworks, snippets, etc. If you're confused about how to do this, take a look at:
[License file for Liam's Euphonic](https://gateway.fxhash2.xyz/ipfs/QmTCxyKXsgLWyVHwneQpwgVNrPqXdd1Aet5nH6dhCgXV8X/license.md)

Finally, ensure you include a relative URL to the licence file in a comment in your `index.html`.

### Add your token information to the index

In this boilerplate you'll find a title tag followed by a block comment in the index.html. Make sure you update this with information on your token.