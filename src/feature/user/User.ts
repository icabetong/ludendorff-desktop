import axios, { AxiosResponse } from "axios";
import { doc, writeBatch } from "firebase/firestore";
import { auth, firestore } from "../../index";
import { userCollection, } from "../../shared/const";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { SERVER_URL } from "../../shared/utils";

export enum Permission {
  READ = 1,
  WRITE = 2,
  DELETE = 4,
  MANAGE_USERS = 8,
  ADMINISTRATIVE = 16
}

export const getIdTokenRefreshed = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        const token = await getIdToken(user)
        return resolve(token)
      } else {
        reject()
      }
    }, reject)
  })
}

export const hasPermission = (user: User, permission: Permission): boolean => {
  /**
   *  Check if the user has the required permissions,
   *  or has the ability to override the permission systems.
   */
  return user.permissions.includes(Permission.ADMINISTRATIVE) ||
    user.permissions.includes(permission);
}

export const minimize = (user: User): UserCore => {
  return {
    userId: user.userId,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    imageUrl: user.imageUrl,
    position: user.position,
    deviceToken: user.deviceToken
  }
}

export type User = {
  userId: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  imageUrl?: string,
  permissions: number[],
  position?: string,
  deviceToken?: string,
  disabled: boolean,
  setupCompleted: boolean,
}

export type UserCore = {
  userId: string,
  name?: string,
  email?: string,
  imageUrl?: string,
  position?: string,
  deviceToken?: string
}

export class UserRepository {

  static async create(user: User): Promise<AxiosResponse<any>> {
    let idToken = await auth.currentUser?.getIdToken(false);

    return await axios.post(`${SERVER_URL}/create-user`, {
      token: idToken,
      ...user
    });
  }

  static async update(user: User): Promise<void> {
    let batch = writeBatch(firestore);
    batch.set(doc(firestore, userCollection, user.userId),
      user);

    await batch.commit()
  }

  static async modify(userId: string, status: boolean): Promise<AxiosResponse<any>> {
    let idToken = await auth.currentUser?.getIdToken(false);

    return await axios.patch(`${SERVER_URL}/modify-user`, {
      token: idToken,
      userId: userId,
      disabled: status
    })
  }

  static async remove(user: User): Promise<AxiosResponse<any>> {
    let idToken = await auth.currentUser?.getIdToken(false);

    return await axios.delete(`${SERVER_URL}/remove-user`, {
      data: {
        token: idToken,
        userId: user.userId
      }
    })
  }
}