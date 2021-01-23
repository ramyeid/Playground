import { MessageService } from "./message.service";

describe('MessageService', () => {

  it('should have no messages at start', () => {
    const service = new MessageService();

    const actualMessages = service.messages;

    expect(actualMessages.length).toBe(0);
  });

  it('should add a message when add is called', () => {
    const service = new MessageService();

    service.add('message1');

    expect(service.messages.length).toBe(1);
  });

  it('should remove all message when clear is called', () => {
    const service = new MessageService();
    service.add('message1');
    service.add('message2');

    service.clear();

    expect(service.messages.length).toBe(0);
  });

});
