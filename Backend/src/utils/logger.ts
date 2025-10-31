import chalk from 'chalk';

type LogLevel = 'info' | 'success' | 'warn' | 'error' | 'debug' | 'socket' | 'db' | 'api' | 'http' | 'auth';

interface LogConfig {
  icon: string;
  color: typeof chalk.blue;
  bg?: typeof chalk.bgBlue;
  label: string;
}

class Logger {
  private readonly configs: Record<LogLevel, LogConfig> = {
    info: { icon: 'ℹ', color: chalk.blue, label: 'INFO' },
    success: { icon: '✓', color: chalk.green, label: 'SUCCESS' },
    warn: { icon: '⚠', color: chalk.yellow, label: 'WARN' },
    error: { icon: '✖', color: chalk.red, bg: chalk.bgRed, label: 'ERROR' },
    debug: { icon: '⚙', color: chalk.magenta, label: 'DEBUG' },
    socket: { icon: '🔌', color: chalk.cyan, label: 'SOCKET' },
    db: { icon: '💾', color: chalk.greenBright, label: 'DATABASE' },
    api: { icon: '🌐', color: chalk.blueBright, label: 'API' },
    http: { icon: '📡', color: chalk.hex('#FF6B6B'), label: 'HTTP' },
    auth: { icon: '🔐', color: chalk.hex('#FFA500'), label: 'AUTH' },
  };

  // Get formatted timestamp with milliseconds
  private getTimestamp(): string {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const ms = now.getMilliseconds().toString().padStart(3, '0');
    return chalk.dim(`[${time}.${ms}]`);
  }

  // Get badge-style prefix
  private getBadge(level: LogLevel): string {
    const config = this.configs[level];
    const badge = ` ${config.icon} ${config.label} `;
    
    // Create colored badge with background for errors
    if (level === 'error') {
      return chalk.white.bgRed.bold(badge);
    }
    return config.color.bold(`[${config.icon} ${config.label}]`);
  }

  // Format data objects with pretty colors
  private formatData(data: any, indent: number = 2): string {
    if (data instanceof Error) {
      return chalk.red.dim(data.stack || data.message);
    }

    if (typeof data === 'object' && data !== null) {
      try {
        const json = JSON.stringify(data, null, indent);
        return json
          .split('\n')
          .map(line => {
            // Color keys
            if (line.includes(':')) {
              const [key, ...rest] = line.split(':');
              return chalk.cyan(key) + ':' + chalk.white(rest.join(':'));
            }
            return chalk.dim(line);
          })
          .join('\n');
      } catch {
        return chalk.dim(String(data));
      }
    }

    return chalk.white(String(data));
  }

  // Main logging method
  private log(level: LogLevel, message: string, data?: any): void {
    const timestamp = this.getTimestamp();
    const badge = this.getBadge(level);
    const config = this.configs[level];

    // Main log line
    console.log(`${timestamp} ${badge} ${config.color(message)}`);

    // Additional data
    if (data !== undefined) {
      const formattedData = this.formatData(data);
      const indented = formattedData.split('\n').map(line => `  ${chalk.dim('│')} ${line}`).join('\n');
      console.log(indented);
    }
  }

  // Public logging methods
  info(message: string, data?: any): void {
    this.log('info', message, data);
  }

  success(message: string, data?: any): void {
    this.log('success', message, data);
  }

  warn(message: string, data?: any): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: any): void {
    this.log('error', message, error);
  }

  debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, data);
    }
  }

  socket(message: string, data?: any): void {
    this.log('socket', message, data);
  }

  db(message: string, data?: any): void {
    this.log('db', message, data);
  }

  api(message: string, data?: any): void {
    this.log('api', message, data);
  }

  http(method: string, url: string, status?: number, duration?: number): void {
    const statusColor = !status 
      ? chalk.gray
      : status < 300 
      ? chalk.green 
      : status < 400 
      ? chalk.yellow 
      : chalk.red;

    const details = [
      chalk.bold(method.toUpperCase()),
      url,
      status ? statusColor(`[${status}]`) : '',
      duration ? chalk.dim(`${duration}ms`) : '',
    ].filter(Boolean).join(' ');

    this.log('http', details);
  }

  auth(message: string, userId?: string): void {
    const details = userId ? `${message} ${chalk.dim(`(${userId})`)}` : message;
    this.log('auth', details);
  }

  // Enhanced dividers
  divider(title?: string, style: 'single' | 'double' | 'thick' = 'double'): void {
    const chars = {
      single: { line: '─', corner: '┌┐└┘' },
      double: { line: '═', corner: '╔╗╚╝' },
      thick: { line: '━', corner: '┏┓┗┛' }
    };

    const char = chars[style];
    const width = 80;

    if (title) {
      const titleText = ` ${title} `;
      const padding = Math.max(0, Math.floor((width - titleText.length) / 2));
      const line = char.line.repeat(padding);
      
      console.log('\n' + chalk.dim(char.corner[0] + char.line.repeat(width - 2) + char.corner[1]));
      console.log(chalk.dim('║') + line + chalk.bold.white(titleText) + line + chalk.dim('║'));
      console.log(chalk.dim(char.corner[2] + char.line.repeat(width - 2) + char.corner[3]) + '\n');
    } else {
      console.log(chalk.dim(char.line.repeat(width)));
    }
  }

  // Box around important messages
  box(message: string, options?: { color?: typeof chalk.green; padding?: number }): void {
    const color = options?.color || chalk.blue;
    const padding = options?.padding || 2;
    
    const lines = message.split('\n');
    const maxLength = Math.max(...lines.map(l => l.length));
    const width = maxLength + (padding * 2);

    const horizontal = '─'.repeat(width);
    const top = `┌${horizontal}┐`;
    const bottom = `└${horizontal}┘`;

    console.log('\n' + color(top));
    lines.forEach(line => {
      const padded = line.padEnd(maxLength, ' ');
      const leftPad = ' '.repeat(padding);
      console.log(color('│') + leftPad + chalk.bold.white(padded) + leftPad + color('│'));
    });
    console.log(color(bottom) + '\n');
  }

  // Fancy section headers
  section(title: string): void {
    const width = 80;
    const titleText = ` ${title.toUpperCase()} `;
    const padding = Math.floor((width - titleText.length) / 2);
    const line = '─'.repeat(Math.max(0, padding));
    
    console.log('\n' + chalk.bold.cyan(line + titleText + line) + '\n');
  }

  // Pretty table with borders
  table(data: Record<string, any>[] | Record<string, any>): void {
    console.log(chalk.dim('\n┌─ TABLE ─────────────────────────────────────────┐'));
    console.table(data);
    console.log(chalk.dim('└──────────────────────────────────────────────────┘\n'));
  }

  // Progress/Loading indicator
  loading(message: string): void {
    process.stdout.write(`${this.getTimestamp()} ${chalk.yellow('⏳')} ${chalk.yellow(message)} `);
  }

  // Complete loading
  loadingDone(success: boolean = true): void {
    const symbol = success ? chalk.green('✓') : chalk.red('✖');
    console.log(symbol);
  }

  // Group logs
  group(title: string): void {
    console.log(chalk.bold.white(`\n▼ ${title}`));
  }

  groupEnd(): void {
    console.log(chalk.dim('▲\n'));
  }

  // Request/Response logging with box
  request(method: string, path: string, data?: any): void {
    const arrow = chalk.dim('→');
    console.log(`\n${this.getTimestamp()} ${chalk.blue.bold('REQUEST')} ${arrow} ${chalk.bold(method)} ${chalk.cyan(path)}`);
    if (data) {
      console.log(chalk.dim('  Body:'), this.formatData(data, 2));
    }
  }

  response(status: number, data?: any, duration?: number): void {
    const arrow = chalk.dim('←');
    const statusColor = status < 300 ? chalk.green : status < 400 ? chalk.yellow : chalk.red;
    const durationText = duration ? chalk.dim(` (${duration}ms)`) : '';
    
    console.log(`${this.getTimestamp()} ${chalk.blue.bold('RESPONSE')} ${arrow} ${statusColor(status)}${durationText}`);
    if (data) {
      console.log(chalk.dim('  Body:'), this.formatData(data, 2));
    }
    console.log('');
  }

  // Server startup banner
  banner(appName: string, version: string, port: number): void {
    const banner = `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ${chalk.bold.greenBright(appName.padEnd(53))}   ║
║   ${chalk.dim(`v${version}`.padEnd(53))}   ║
║                                                           ║
║   ${chalk.cyan('Server running on port:')} ${chalk.bold.yellow(String(port).padEnd(27))}   ║
║   ${chalk.cyan('Environment:')} ${chalk.bold.yellow((process.env.NODE_ENV || 'development').padEnd(36))}   ║
║   ${chalk.cyan('Time:')} ${chalk.white(new Date().toLocaleString().padEnd(44))}   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `;
    console.log(chalk.green(banner));
  }
}

export default new Logger();
