const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('Reverse Endpoint Tests', () => {
  const testPort = 3022;  // different port for testing
  const baseUrl = `http://localhost:${testPort}`;

  let testServer;

  before((done) => {
    testServer = app.listen(testPort, done);
  });

  after(() => {
    testServer.close();
  });

  it('should reverse a valid message', (done) => {
    const message = '!maeT ylhtraE olleH';

    chai.request(baseUrl)
      .post('/reverse')
      .send({ message })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('reversedMessage');
        expect(res.body.reversedMessage).to.equal('Hello Earthly Team!');
        done();
      });
  });

  it('should handle missing message', (done) => {
    chai.request(baseUrl)
      .post('/reverse')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Message field is required');
        done();
      });
  });

  it('should handle exceeding length limit', (done) => {
    const longMessage = 'a'.repeat(101);

    chai.request(baseUrl)
      .post('/reverse')
      .send({ message: longMessage })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Message length exceeds the limit');
        done();
      });
  });

  it('should handle empty message', (done) => {
    chai.request(baseUrl)
      .post('/reverse')
      .send({ message: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal('Message field is required');
        done();
      });
  });
});
