class Cancel {
  message: string
  constructor(message) {
    this.message = message
  }
}

export const isCancel = error => error instanceof Cancel

export class CancelToken {
  resolve: any
  source() {
    return {
      token: new Promise(resolve => {
        this.resolve = resolve
      }),
      cancel: msg => {
        this.resolve(new Cancel(msg))
      }
    }
  }
}
