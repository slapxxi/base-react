export let settings = [
  {
    title: 'HttpOnly session cookie',
    description: 'The session token is never readable by JavaScript, which reduces the impact of XSS.',
  },
  {
    title: 'Bcrypt password hashing',
    description: 'Passwords are hashed with bcrypt before they are written to the JSON user store.',
  },
  {
    title: 'Signed JWT sessions',
    description: 'Tokens are signed with HMAC-SHA256 and validated on every protected API request.',
  },
  {
    title: 'SameSite cookies',
    description: 'Cookies use SameSite=Lax by default and can be marked Secure in production.',
  },
]

export let environmentVariables = `AUTH_JWT_SECRET=<at least 32 random characters>
AUTH_DB_PATH=./server/data/users.json
AUTH_ADDR=:8080
AUTH_ALLOWED_ORIGIN=http://localhost:5173`
