class SSEConnection {
  /**
   * 封装 EventSource，支持自动重连和自定义事件处理
   * @param {string} url - SSE 服务器的 URL
   * @param {Object} options - 配置选项
   * @param {number} options.maxRetries - 最大重连次数，默认为 5
   * @param {number} options.retryInterval - 重连间隔时间（毫秒），默认为 5000
   * @param {Object} options.eventHandlers - 自定义事件处理器，格式为 { eventName: callback }
   */

  private url: string;
  private maxRetries: number;
  private retryInterval: number;
  private eventHandlers: {
    [key: string]: (event: MessageEvent | Event) => void;
  };
  private reconnectAttempts: number;
  private eventSource: EventSource | null;

  constructor(
    url: string,
    options: {
      maxRetries?: number;
      retryInterval?: number;
      eventHandlers?: { [key: string]: (event: Event) => void };
    } = {}
  ) {
    this.url = url;
    this.maxRetries = options.maxRetries || 5;
    this.retryInterval = options.retryInterval || 5000;
    this.eventHandlers = options.eventHandlers || {};
    this.reconnectAttempts = 0;
    this.eventSource = null;

    this.connect();
  }

  // 建立连接
  connect() {
    this.eventSource = new EventSource(this.url);

    // 监听连接打开事件
    this.eventSource.onopen = (event) => {
      console.log('SSE Connection opened');
      this.reconnectAttempts = 0; // 重置重连次数
      if (this.eventHandlers.open) {
        this.eventHandlers.open(event);
      }
    };

    // 监听消息事件
    this.eventSource.onmessage = (event) => {
      // console.log('SSE Message received:', event.data);
      if (this.eventHandlers.message) {
        this.eventHandlers.message(event);
      }
    };

    // 监听错误事件
    this.eventSource.onerror = (event) => {
      console.error('SSE Connection error:', event);
      this.handleError();
    };

    // 绑定自定义事件处理器
    Object.keys(this.eventHandlers).forEach((eventName) => {
      if (
        eventName !== 'open' &&
        eventName !== 'message' &&
        eventName !== 'error' &&
        this.eventSource
      ) {
        this.eventSource.addEventListener(
          eventName,
          this.eventHandlers[eventName]
        );
      }
    });
  }

  // 处理连接错误
  handleError() {
    if (this.eventSource) {
      this.eventSource.close(); // 关闭当前连接
    }

    if (this.reconnectAttempts < this.maxRetries) {
      this.reconnectAttempts++;
      console.log(
        `Reconnecting in ${this.retryInterval / 1000} seconds... (Attempt ${
          this.reconnectAttempts
        })`
      );
      setTimeout(() => this.connect(), this.retryInterval); // 重连
    } else {
      console.error('Max reconnection attempts reached. Giving up.');
      if (this.eventHandlers.error) {
        this.eventHandlers.error(
          new Error('Max reconnection attempts reached') as unknown as Event
        );
      }
    }
  }

  // 关闭连接
  close() {
    if (this.eventSource) {
      this.eventSource.close();
      console.log('SSE Connection closed');
    }
  }
}

export default SSEConnection;
