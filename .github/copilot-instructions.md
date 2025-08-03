<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Uranabot - Telegram Bot Project Instructions

## Project Overview
This is a TypeScript-based Telegram bot using the grammY library. The bot is designed to be deployed via Docker with CI/CD through GitHub Actions.

## Code Style and Standards
- Use strict TypeScript with all recommended ESLint rules
- Follow Prettier formatting standards
- All functions must have explicit return types
- Use async/await instead of Promises
- Prefer const over let where possible
- Use meaningful variable and function names in English
- Add JSDoc comments for all public functions and classes

## Architecture Guidelines
- Follow modular architecture with separation of concerns
- Commands should be in `/src/commands/` directory
- Middlewares should be in `/src/middlewares/` directory
- Utilities should be in `/src/utils/` directory
- Configuration should be centralized in `/src/config.ts`
- Use dependency injection where appropriate

## grammY Library Usage
- Always use typed contexts with SessionFlavor
- Handle errors gracefully with bot.catch()
- Use middlewares for cross-cutting concerns
- Implement proper session management
- Add logging for all user interactions

## Security Considerations
- Never commit sensitive data like bot tokens
- Use environment variables for all configuration
- Validate all user inputs
- Implement rate limiting if needed
- Use least privilege principle in Docker containers

## Docker and Deployment
- Use multi-stage builds for smaller images
- Run containers as non-root user
- Include health checks
- Use proper secret management
- Follow 12-factor app principles

## Testing
- Write unit tests for business logic
- Mock external dependencies
- Test error scenarios
- Use meaningful test descriptions

## Error Handling
- Always handle bot errors with try-catch or bot.catch()
- Log errors with appropriate level (error, warn, info, debug)
- Provide user-friendly error messages
- Never expose internal errors to users
