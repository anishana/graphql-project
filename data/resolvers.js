import { Widgets, Categories } from './dbconnectors';
import { reject } from 'lodash';
import { NOTFOUND } from 'sqlite3';

const resolvers = {
    getProduct: ({ id }) => {
        return new Promise((resolve) => {
            Widgets.findById({ _id: id }).then((res, err) => {
                if (err) {
                    reject(err);
                }
                else
                    resolve(res);
            });
        });
    },
    getCategories: () => {
        return new Promise((resolve) => {
            Categories.findAll({
                raw: true
            }).then((res, err) => {
                if (err) {
                    reject(err);
                }
                else {
                    console.log("res: ", res);
                    resolve(res);
                }
            })
        })
    },
    getAllProducts: () => {
        return new Promise((resolve) => {
            Widgets.find().then((res, err) => {
                if (err) {
                    reject(err);
                }
                else
                    resolve(res);
            });
        });
    },
    createProduct: ({ input }) => {
        const newWidget = new Widgets({
            name: input.name,
            description: input.description,
            price: input.price,
            soldout: input.soldout,
            inventory: input.inventory,
            stores: input.stores,

        })

        newWidget.id = newWidget._id;

        return new Promise((resolve) => {
            newWidget.save().then((res, err) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            })
        })
    },
    updateProduct: ({ input }) => {
        return new Promise((resolve) => {
            Widgets.findOneAndUpdate({ _id: input.id }, input, {new: true}).then((res, err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res);
                }
            })
        });
    },
    deleteProduct: ({ id }) => {
        return new Promise((resolve) => {
            Widgets.deleteOne({ 
                _id: id 
            }).then((res,err)=>{
                if(err){
                    reject(err);
                } else {    
                    if(res.deletedCount == 1)
                        resolve("Successfully Deleted Product");
                    else    
                        resolve("Product Not deleted");
                }
            })
        });
    },
}


export default resolvers;