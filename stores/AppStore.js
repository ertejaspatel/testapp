import { action, observable, toJS } from "mobx";
import { useStaticRendering } from "mobx-react";
import { ApiClient } from "../Agent";


const isServer = typeof window === "undefined";

useStaticRendering(isServer);


export class AppStore {
  @observable user;
  @observable lastUpdate = 0;

  hydrate(serializedStore) {
    this.lastUpdate =
      serializedStore.lastUpdate != null
        ? serializedStore.lastUpdate
        : Date.now();

    this.user = serializedStore.user;

    // console.log("State Updated", toJS(this.user));
  }

  @action setCurrentUser = user => {
    this.user = user;
    this.lastUpdate = Date.now();
  };

  @action setCurrentUserProp(key, val) {
    const keys = key.split(".");
    switch (keys.length) {
      case 1:
        this.user[key] = val;
        break;
      case 2:
        this.user[keys[0]][keys[1]] = val;
        break;
      case 3:
        this.user[keys[0]][keys[1]][keys[2]] = val;
        break;
    }
  }
}

export async function fetchInitialStoreState(appContext) {
  const isServer = typeof window === "undefined";
  //console.log("App Context", appContext);
  let user = {};
  if (isServer) {
    user = appContext.ctx.req.user;
  } else {
    try {
      const response = await ApiClient.get("/api/users/me");
      console.log("Initial State", response);
      user = response.data.user;
    } catch (err) {
      console.log("Error ", err, appContext);
    }
  }
  return { user: user };
}
