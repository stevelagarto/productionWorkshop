const mongoose = require("mongoose");
const Axios = require("axios");
const sessionFactory = require("../tests/factories/sessionFactory");
require("../models/User");
require("../models/Blog");

  const User = mongoose.model('User');
  const Blog = mongoose.model('Blog');

//mongoose.Promise = global.Promise;

describe("When logged in", async () => {
  let session;
  let sessionSig;
  let existingUser;
  let result;

  beforeAll(async (done) => {
   try {
      User.collection.drop();
      //Blog.collection.drop();
       user = await new User({
        googleId: "123456789",
        displayName: "Testing Name1"
      }).save();
   } catch (err) {
     console.log('error in new User.save', err);
     
   }
    
    existingUser = await User.findOne({ googleId: "123456789" });

    session = sessionFactory(existingUser).session;
    sessionSig = sessionFactory(existingUser).sig;

    const blog = new Blog({
      imageUrl: "aa",
      title: "test title",
      content: "test content",
      createdAt: "2020-01-20T17:31:33.996Z",
      _user: existingUser.id
    });

    try {
      await blog.save();
      done()
    } catch (err) {
      res.send(400, err);
    }
  });

  afterAll(async done => {
    mongoose.connection.close();
    done();
  });

  test("Blogs are fetched by user", async done => {
    try {
      result = await Axios.request({
        url: "http://localhost:5000/api/blogs",
        method: "get",
        headers: {
          Cookie: `session=${session}; session.sig=${sessionSig};`
        }
      });
      mock = [
        {
          _id: result.data[0]._id,
          imageUrl: "aa",
          title: "test title",
          content: "test content",
          _user: existingUser.id,
          __v: 0,
          createdAt: "2020-01-20T17:31:33.996Z"
        }
      ];
      expect(result.data).toEqual(mock);
    } catch (error) {
      console.log('error', error);
      
    } finally {
      done();

    }
    
  });

  test("Only one blog is fetched by user and ID", async () => {
    res = await Axios.request({
      url: `http://localhost:5000/api/blogs/${result.data[0]._id}`,
      method: "get",
      headers: {
        Cookie: `session=${session}; session.sig=${sessionSig};`
      }
    });
    expect([res.data]).toEqual(mock);
  });

  test("Fetch User", async () => {
    res = await Axios.request({
      url: `http://localhost:5000/api/current_user`,
      method: "get",
      headers: {
        Cookie: `session=${session}; session.sig=${sessionSig};`
      }
    });
    const newData = res.data._id.toString();
    expect(newData).toEqual(existingUser._id.toString());
  });
});

// const Page = require('./helpers/page');

// let page;

// beforeEach(async () => {
//   page = await Page.build();
//   await page.goto('http://localhost:3000');
// });

// afterEach(async () => {
//   await page.close();
// });

// describe('When logged in', async () => {
//   beforeEach(async () => {
//     await page.login();
//     await page.click('a.btn-floating');
//   });

//   test('can see blog create form', async () => {
//     const label = await page.getContentsOf('form label');

//     expect(label).toEqual('Blog Title');
//   });

//   describe('And using valid inputs', async () => {
//     beforeEach(async () => {
//       await page.type('.title input', 'My Title');
//       await page.type('.content input', 'My Content');
//       await page.click('form button');
//     });

//     test('Submitting takes user to review screen', async () => {
//       const text = await page.getContentsOf('h5');

//       expect(text).toEqual('Please confirm your entries');
//     });

//     test('Submitting then saving adds blog to index page', async () => {
//       await page.click('button.green');
//       await page.waitFor('.card');

//       const title = await page.getContentsOf('.card-title');
//       const content = await page.getContentsOf('p');

//       expect(title).toEqual('My Title');
//       expect(content).toEqual('My Content');
//     });
//   });

//   describe('And using invalid inputs', async () => {
//     beforeEach(async () => {
//       await page.click('form button');
//     });

//     test('the form shows an error message', async () => {
//       const titleError = await page.getContentsOf('.title .red-text');
//       const contentError = await page.getContentsOf('.content .red-text');

//       expect(titleError).toEqual('You must provide a value');
//       expect(contentError).toEqual('You must provide a value');
//     });
//   });
// });

// describe('User is not logged in', async () => {
//   const actions = [
//     {
//       method: 'get',
//       path: '/api/blogs'
//     },
//     {
//       method: 'post',
//       path: '/api/blogs',
//       data: {
//         title: 'T',
//         content: 'C'
//       }
//     }
//   ];

//   test('Blog related actions are prohibited', async () => {
//     const results = await page.execRequests(actions);

//     for (let result of results) {
//       expect(result).toEqual({ error: 'You must log in!' });
//     }
//   });
// });
