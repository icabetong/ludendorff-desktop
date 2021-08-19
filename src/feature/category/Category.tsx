import { firestore } from "../../index";
import { Asset } from "../asset/Asset";
import { Assignment } from "../assignment/Assignment";
import { newId } from "../../shared/utils";

export class Category {
    categoryId: string
    categoryName?: string
    count: number = 0

    constructor(id: string = newId()) {
        this.categoryId = id
    }

    minimize(): CategoryCore {
        return CategoryCore.from(this)
    }

    static from(document: any): Category {
        let category = new Category(document.categoryId);
        category.categoryName = document.categoryName
        category.count = document.count

        return category
    }

    static COLLECTION = "categories"
    static FIELD_CATEGORY_ID = "categoryId"
    static FIELD_CATEGORY_NAME = "categoryName"
    static FIELD_COUNT = "count"
}

export class CategoryCore {
    categoryId: string
    categoryName?: string

    constructor(id: string = newId()) {
        this.categoryId = id
    }

    static from(category: Category): CategoryCore {
        let core = new CategoryCore(category.categoryId)
        core.categoryName = category.categoryName
        return core
    }
}

export class CategoryRepository {

    static async create(category: Category): Promise<void> {
        return await firestore.collection(Category.COLLECTION)
            .doc(category.categoryId)
            .set({...category})
    }

    static async update(category: Category): Promise<void> {
        let batch = firestore.batch()

        batch.set(firestore.collection(Category.COLLECTION)
            .doc(category.categoryId), {...category})

        let assetTask = await firestore.collection(Asset.COLLECTION)
            .where(Asset.FIELD_CATEGORY_ID, "==", category.categoryId)
            .get()
        assetTask.docs.forEach(doc => {
            batch.update(doc.ref, Asset.FIELD_CATEGORY, category.minimize())
        })

        let assignmentTask = await firestore.collection(Assignment.COLLECTION)
            .where(Assignment.FIELD_CATEGORY_ID, "==", category.categoryId)
            .get()

        assignmentTask.docs.forEach(doc => {
            batch.update(doc.ref, Assignment.FIELD_CATEGORY, category.minimize())
        })

        return batch.commit()
    }

    static async remove(category: Category): Promise<void> {
        return await firestore.collection(Category.COLLECTION)
            .doc(category.categoryId)
            .delete()
    }

    static async fetch(): Promise<Category[]> {
        let categories: Category[] = [];

        let task = await firestore.collection(Category.COLLECTION).get();
        task.docs.forEach(document => 
            categories.push(Category.from(document.data()))
        )

        return categories;
    }
}