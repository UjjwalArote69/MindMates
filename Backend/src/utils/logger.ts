import chalk from 'chalk';

type LogLevel = 'info' | 'success' | 'warn' | 'error' | 'debug' | 'socket' | 'db' | 'api';

class Logger {
  private getTimestamp(): string {
    const now = new Date();
    return chalk.gray(`[${now.toLocaleTimeString()}]`);
  }

  private getPrefix(level: LogLevel): string {
    const prefixes = {
      info: chalk.blue('ℹ INFO'),
      success: chalk.green('✓ SUCCESS'),
      warn: chalk.yellow('⚠ WARN'),
      error: chalk.red('✖ ERROR'),
      debug: chalk.magenta('⚙ DEBUG'),
      socket: chalk.cyan('🔌 SOCKET'),
      db: chalk.green('💾 DB'),
      api: chalk.blueBright('🌐 API'),
    };
    return prefixes[level] || chalk.white('LOG');
  }

  private formatMessage(level: LogLevel, message: string, data?: any): void {
    const timestamp = this.getTimestamp();
    const prefix = this.getPrefix(level);
    
    console.log(`${timestamp} ${prefix} ${message}`);
    
    if (data) {
      if (typeof data === 'object') {
        console.log(chalk.gray(JSON.stringify(data, null, 2)));
      } else {
        console.log(chalk.gray(data));
      }
    }
  }

  info(message: string, data?: any): void {
    this.formatMessage('info', chalk.white(message), data);
  }

  success(message: string, data?: any): void {
    this.formatMessage('success', chalk.green(message), data);
  }

  warn(message: string, data?: any): void {
    this.formatMessage('warn', chalk.yellow(message), data);
  }

  error(message: string, data?: any): void {
    this.formatMessage('error', chalk.red(message), data);
    if (data instanceof Error) {
      console.log(chalk.red(data.stack));
    }
  }

  debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      this.formatMessage('debug', chalk.magenta(message), data);
    }
  }

  socket(message: string, data?: any): void {
    this.formatMessage('socket', chalk.cyan(message), data);
  }

  db(message: string, data?: any): void {
    this.formatMessage('db', chalk.green(message), data);
  }

  api(message: string, data?: any): void {
    this.formatMessage('api', chalk.blueBright(message), data);
  }

  // Fancy divider for sections
  divider(title?: string): void {
    const line = chalk.gray('═'.repeat(60));
    if (title) {
      console.log(`\n${line}\n${chalk.bold.white(` ${title} `)}\n${line}\n`);
    } else {
      console.log(line);
    }
  }

  // Table for structured data
  table(data: any[]): void {
    console.table(data);
  }
}

export default new Logger();
