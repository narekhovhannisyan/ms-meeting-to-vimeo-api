# Contributing to recording-meetings

## Code Contributions

#### Step 1: Clone

Clone the project on [GitLab](https://gitlab.com/internos2/recording-meetings.git)
   
   ```bash
   $ git clone https://gitlab.com/internos2/recording-meetings.git
   $ cd recording-meetings
   ```
   
For developing new features and bug fixes, the development branch should be pulled and built upon.

#### Step 2: Branch

Create new branch from main (`staging` or `master`), which will contain your new future, fix or change. 

    ```bash
    $ git checkout -b <topic-branch-name>
    ```

#### Step 3: Commit

Make sure git knows your name and email address:

   ```bash
   $ git config --global user.name "Example User"
   $ git config --global user.email "user@example.com"
   ```

Commiting multiple files with changes on multiple resources is strongly restricted.
Commit message should clearly describe on which resource changes are made.

Add and commit:

   ```bash
   $ git add my/changed/files
   $ git commit
   ```  
    
Commit your changes in logical chunks. Do not push all changes in one commit!! 

Please adhere to these [Commit message guidelines](#commit-message-guidelines)
   or your code is unlikely be merged into the main project.

#### Step 4: Sync

Use git pull/merge to synchronize your work with the main repository.

   ```bash
   $ git pull origin staging/master
   ```
   
#### Step 5: Push

Push your topic branch:

   ```bash
   $ git push origin <topic-branch-name>
   ```

#### Step 6: Pull Request

Open a Pull Request with a clear title and description.

Pull request should pass all CI which are defined, should have at least one approve.

CI can include lint checks, running tests and etc.

## Commit message guidelines

The commit message should describe what changed and why.

   1. The first line should:
       * contain a short description of the change
       * be 60 characters or less
       * be prefixed with the name of the changed subsystem
       * be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code,
         like function/variable names
        
       Examples:
       
       ```
        lib: add listUberAddresses method to Uber lib
        deps: add express package to dependencies
        service: refactor get user
       ```
   2. Keep the second line blank. 
          
   3. Wrap all other lines at 72 columns:
      * describe each line in logical chunks
      * start each line with: space hyphen space ( - ...)
      * be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code,
        like function/variable names
      
      Examples:
      
      ```    
        - remove deprecated logger
        - refactor some method
        - add JSDoc on existing function
      ```

*[⬅️ back to the root](/README.md#recording-meetings)*      
