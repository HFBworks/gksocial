# Contributing to GlassKom Social

Thank you for your interest in contributing to GlassKom Social! 🎉

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. Check if the issue already exists in [GitHub Issues](https://github.com/HFBworks/gksocial/issues)
2. If not, create a new issue with a clear title and description
3. Include steps to reproduce for bugs
4. Add labels to categorize your issue

### Pull Requests

1. **Fork the repository**
   ```bash
   gh repo fork HFBworks/gksocial --clone
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   # Run the development environment
   cd docker
   docker-compose -f docker-compose.dev.yml up
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `style:` Code style changes
   - `refactor:` Code refactoring
   - `test:` Test additions/changes
   - `chore:` Build process or auxiliary tool changes

6. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   gh pr create --fill
   ```

## Development Setup

See [DOCKER_DEV_GUIDE.md](DOCKER_DEV_GUIDE.md) for detailed development setup instructions.

## Code Style

- **Frontend**: Follow TypeScript and React best practices
- **Backend**: Follow Node.js and Express conventions
- **Formatting**: Run linters before committing
  ```bash
  cd frontend && npm run lint
  cd backend && npm run lint
  ```

## Questions?

Feel free to open a [Discussion](https://github.com/HFBworks/gksocial/discussions) for any questions!

---

Thank you for contributing! 🙏
