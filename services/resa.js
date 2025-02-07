import twilio from "twilio"; // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'ACa12f110ead049d436229feb6983495d3';
const authToken = '8e5f882f6a73627b41023ff062bf3867';
const client = twilio(accountSid, authToken);

class Resa {

  find(){
    console.log('resa -find');
  }
  async sendMessage( msg, number) {
      const message = await client.messages.create({
        body: "This is the ship that made the Kessel Run in fourteen parsecs?",
        from: "+15076906909",
        to: "+33672264908",
      });
  }
}

const resa = new Resa();

export default resa;
