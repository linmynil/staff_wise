import { IMessage } from 'react-native-gifted-chat';

const messages: IMessage[] = [
  {
    _id: 1,
    text: 'This is a system message',
    createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
    // system: true,
    user: {
      _id: 0,
      avatar:
        'https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740&q=80',
    },
  },
  {
    _id: 2,
    text: 'Hello developer',
    createdAt: new Date(Date.UTC(2016, 5, 12, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
      avatar:
        'https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740&q=80',
    },
  },
  {
    _id: 3,
    text: 'Hi! I work from home today!',
    createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'React Native',
      avatar:
        'https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740&q=80',
    },
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWwfh7IWRn0KVsr4PB5rvTG3OS8UKoph9Z8w&s',
  },
  {
    _id: 4,
    text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
    createdAt: new Date(Date.UTC(2016, 5, 14, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
      avatar:
        'https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740&q=80',
    },
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
      values: [
        {
          title: '😋 Yes',
          value: 'yes',
        },
        {
          title: '📷 Yes, let me show you with a picture!',
          value: 'yes_picture',
        },
        {
          title: '😞 Nope. What?',
          value: 'no',
        },
      ],
    },
  },
  {
    _id: 5,
    text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
    createdAt: new Date(Date.UTC(2016, 5, 15, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
      avatar:
        'https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740&q=80',
    },
    quickReplies: {
      type: 'checkbox', // or 'radio',
      values: [
        {
          title: 'Yes',
          value: 'yes',
        },
        {
          title: 'Yes, let me show you with a picture!',
          value: 'yes_picture',
        },
        {
          title: 'Nope. What?',
          value: 'no',
        },
      ],
    },
  },
  {
    _id: 6,
    text: 'Come on!',
    createdAt: new Date(Date.UTC(2016, 5, 15, 18, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
      avatar:
        'https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740&q=80',
    },
  },
  {
    _id: 9,
    text: 'Come on!',
    createdAt: new Date(Date.UTC(2016, 5, 15, 18, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
      avatar:
        'https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740&q=80',
    },
  },
  {
    _id: 7,
    text: `Hello this is an example of the ParsedText, links like http://www.google.com or http://www.facebook.com are clickable and phone number 444-555-6666 can call too.
        But you can also do more with this package, for example Bob will change style and David too. foo@gmail.com
        And the magic number is 42!
        #react #react-native`,
    createdAt: new Date(Date.UTC(2016, 5, 13, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'React Native',
      avatar:
        'https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740&q=80',
    },
  },
];

export default messages;
