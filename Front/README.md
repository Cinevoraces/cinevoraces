# CinéVoraces | Front Dev
## :closed_book: Git Rules
:warning: **master branch can never be updated without lead team's approval, do not push on master.**
### Commits
#### :pencil2: Naming conventions
|Tag|Usage|
|-|-|
|**```<cfg>```**|Update .eslintrc / tsconfig.json / package.json|
|**```<doc>```**|Update README.md / JSDoc / Comments.|
|**```<feat>```**|Create a new feature or update an existing one.|
|**```<fix>```**|Fix of a broken feature.|
|**```<pkg>```**|Add / remove package.|
|**```<ref>```**|Code refactoring.|

```
git commit -m '<commitTag> commit description...'
```
#### :snail: When to commit?
Commits should **never contain more than one** of the above-named categories.  
A new feature and its documentation are **two separated commits**, even if it's a single line comment.  
For instance, if you create a new component, best practice would be to commit separately HTML, CSS and logic.  
**Commit often.**
#### :scissors: Describe your commits
Write your commit description with words, not sentences.  
Commits description should **never be omitted**.  

### Branch management
#### :pencil2: Naming conventions
Any branch name related to an issue should be prefixed with the issue number. See an example below.
```
2-code-refactoring
```
Only **dev** and **master** deviates from this rule.
#### :books: Pull requests
Before openning a pull request you need to follow these steps;
- Make sure that your branch is fully working with no bug.
- Merge **dev** on **your branch**, and **test it**.
- Review your code.

When an issue is closed, the corresponding branch must be deleted.

### Issues
- Every issue must be written in english with a self-explanatory name.  
- Issues description have to be comprehensive with detailed informations / instructions.  
- Issues should always be associate with a project and corresponding labels.
- If you work on an issue, you must assign yourself to it.
