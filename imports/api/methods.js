import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";

if (Meteor.isServer) {
import wikipedia from "node-wikipedia";
  Meteor.methods({
    getData(query){
      console.log(query);
      // return [{data: "Hi!"}, {extra: "Hello!"}];

      return new Promise((resolve, reject) => {
        wikipedia.page.data(query, { content: true }, resolve);
      });
    }
  });
}