import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/http";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const UserHistory = new Mongo.Collection("hist");

if (Meteor.isServer) {
  Meteor.publish("hist", function historyToPublish() {
    let data = UserHistory.find({ owner: this.userId });
    console.log("returning data", data);
    return data;
  });
}

if (Meteor.isServer) {
  import wikipedia from "node-wikipedia";
  Meteor.methods({
    getData(query) {
      console.log(query);

      return new Promise((resolve, reject) => {
        wikipedia.page.data(query, { content: true }, resolve);
      });
    }
  });
}

Meteor.methods({
  "hist.insert"(text) {
    check(text, String);
    console.log("hist.insert text: ", text);

    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    UserHistory.insert({
      text,
      createdAt: new Date(),
      owner: this.userId
    });
  }
});
