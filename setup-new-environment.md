# Setup new environment
This is a tutorial on how to setup a new environment. Let's call it `beta`.

## 1. Create new branch
- `master` and `develop` should be at the same point, or at least there is no commits that affects database.
- Check out a new branch called `beta` from `master`.

## 2. Add configs
- Create `src/config/beta.js` based on `src/config/production.js`. `Beta` uses the same GA ID and Intercom ID with `Production`
- Include beta in `webpack.config.js`
  
## 3. Update CircelCI script
- `.circleci/config.yml`: add `beta`'s logic to the file. Similar to `staging`, it automatically deploys, whenever new changes are pushed to `beta` branch.

## 4. Deploy
- Push the new `beta` branch and let CircleCI do the rest
  
## 5. Post deploy
- Check if all sites are working properly

## 6. Github
- `beta` branch must be protected from now on.
