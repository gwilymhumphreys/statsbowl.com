export default (options) => `
<html>
  <body>
    <h4>Welcome to statsbowl</h4>
    <p>Hit this link to <a href="${options.confirmationUrl}">confirm your email</a>.</p>
    <p>Thanks!</p>
    <p>- The statsbowl team</p>
  </body>
</html>
`
