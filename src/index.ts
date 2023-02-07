import RingCentral from '@rc-ex/core';
import waitFor from 'wait-for-async';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rc.authorize({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });
  for (let i = 0; i < 100; i++) {
    rc.restapi()
      .account()
      .extension()
      .callLog()
      .list({perPage: 100 + i});
    console.log(i + 1);
  }

  await waitFor({interval: 100000});
};

main();
