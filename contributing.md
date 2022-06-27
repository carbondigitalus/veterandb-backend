# Contributing to Veteran Database

## Guidelines

-   **Node Version:**

    -   Our projects all use Node Version Manager (NVM). To ensure consistency in versioning, we've included the NVM config file called `.nvmrc` in the root directory.
    -   We also use this version to ensure that all NPM packages align with the Node version from this file.

-   **Coding Standard:**

    -   Linting errors are checked by [ESLint][link-eslint] and [Prettier][link-prettier].
    -   Config files for ESLint (`.eslintrc.js`) and Prettier `.prettierrc` have been included at the root level.

-   **Add Relevant Tests:**

    -   All pull requests should include relevant tests to ensure the change works as expected and to prevent regression errors.
    -   Test Types: [Types of Test for Developers][link-test-types].
    -   Your code may be rejected for failure to include tests. Please be prepared to rectify this if you submit without tests.

-   **Document Changes in Behaviour:**

    -   Some of our projects rely on inline TypeScript documentation, powered by [TypeDoc][link-typedoc].
    -   Some changes may also include GitHub `*.md` updates too.

-   **One Pull Request per Feature/Bug/Issue:**

    -   Our tracking for pull requests is based on the issues list.
    -   One pull request per issue.

-   **Send Coherent Comment History:**

    -   Make sure each individual commit in your pull request is meaningful. If you had to make multiple intermediate commits while developing, please [rebase or squash them][link-git-rebase] before submitting.

## Running Tests

In order to contribute, you'll need to checkout the source from GitHub and
install dependencies using npm. The actual `npm test` commend will depend on which type of test you're running.

```
git clone https://github.com/carbondigitalus/<PROJECT>.git
cd <PROJECT>
npm install
npm test
```

## Reporting Security Vulnerabilities

See [security.md](security.md)

**Happy Coding**!

[link-git-rebase]: http://www.git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Changing-Multiple-Commit-Messages
[link-eslint]: https://eslint.org/
[link-prettier]: https://prettier.io/
[link-test-types]: https://semaphoreci.com/blog/20-types-of-testing-developers-should-know
[link-typedoc]: https://typedoc.org/guides/doccomments/
