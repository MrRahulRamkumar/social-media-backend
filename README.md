# social-media-backend

### Problem Statement

Build APIs for a social media platform in the NodeJS web app. The API should support features like getting a user profile, follow a user, upload a post, delete a post, like a post, unlike a liked post, and comment on a post. Design the database schema and implement in PostgreSQL.

**API Endpoints**

- POST /api/authenticate should perform user authentication and return a JWT token.
    - INPUT: Email, Password
    - RETURN: JWT token
    
    <aside>
    ➡️ Use dummy email & password for authentication. No need to create endpoint for registering new user.
    </aside>
    
- POST /api/follow/{id} authenticated user would follow user with {id}
- POST /api/unfollow/{id} authenticated user would unfollow a user with {id}
- GET /api/user should authenticate the request and return the respective user profile.
    - RETURN: User Name, number of followers & followings.
- POST api/posts/ would add a new post created by the authenticated user.
    - Input: Title, Description
    - RETURN: Post-ID, Title, Description, Created Time(UTC).
- DELETE api/posts/{id} would delete post with {id} created by the authenticated user.
- POST /api/like/{id} would like the post with {id} by the authenticated user.
- POST /api/unlike/{id} would unlike the post with {id} by the authenticated user.
- POST /api/comment/{id} add comment for post with {id} by the authenticated user.
    - Input: Comment
    - Return: Comment-ID
- GET api/posts/{id} would return a single post with {id} populated with its number of likes and comments
- GET /api/all_posts would return all posts created by authenticated user sorted by post time.
    - RETURN: For each post return the following values
        - id: ID of the post
        - title: Title of the post
        - desc: Description of the post
        - created_at: Date and time when the post was created
        - comments: Array of comments, for the particular post
        - likes: Number of likes for the particular post

### **Stacks**

- Backend: NodeJS (Using ExpressJS or Koa) and other helping NodeJS libraries
- Database: PostgreSQL

### Submission Details

- Implement the mentioned functionalities by writing your code & hosting it on Heroku
- Submit the Heroku hosted link for the deployed APIs and Github or Gitlab public repository link for the deployed code in the form below
