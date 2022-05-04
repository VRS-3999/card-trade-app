FROM node:10.16.3-slim

# Create a directory for our code
WORKDIR /studiosleeves

# Important to copy package-lock.json as well
# The npm ci command depends on package-lock.json
COPY package.json package.json
COPY package-lock.json package-lock.json

# The ci command is a much faster way to install dependencies
RUN npm ci

# BEGIN: create react app section
COPY tsconfig.json tsconfig.json
COPY public public
COPY config-overrides.js config-overrides.js
# END: create react app section

COPY src src

# Creating runtime build to update changes in application
# npm run build to build react based projects
CMD npm run build