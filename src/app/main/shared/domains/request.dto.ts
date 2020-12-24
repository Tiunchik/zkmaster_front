export class RequestDto {

  constructor(public host?: string,
              public path?: string,
              public value?: string,
              public name?: string) {
  }

}
