const productModel = require("../model/productModel");

// inserting many
const insertMany = async (req, res) => {
  try {
    const products = await productModel.insertMany(req.body);
    res
      .status(201)
      .json({success:'true', message: "successfully created all products", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// create a product
const createProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res
      .status(201)
      .json({success:'true', message: "successfully created a product", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// delete many
const deleteMany = async (req, res) => {
  try {
    const products = await productModel.deleteMany({});
    res
      .status(200)
      .json({success:'true', message: "successfully deleted all products", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete({
      _id: req.params.productId,
    });
    res.status(200).json({success:'true',message: "successfully deleted a product",product});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// update product -- Params
const updateProduct = async (req, res) => {
  try {
    const product = await productModel.updateOne(
      { _id: req.params.productId },
      { $set: req.body }
    );
    res.status(200).json({success:'true',message: "successfully updated a product",product});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// single product  -- Params
const singleProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.productId);
    res.status(200).json({success:'true',message: "product",product});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// get products
const allProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if(products.length < 1) {
    res.status(400).json({success:'false', message: "no products found / created yet"})
    return
  }
      
    res.status(200).json({success:'true',message: "all products",products});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

//get all products by category
const getProductCategory = async (req, res) => {
  // const productIdId = req.params.productIdId
  try {
    const products = await productModel.find({
      category: req.params.productCategary,
    });
    res.status(200).json({success:'true',message: "products category",products});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};


module.exports = {
    insertMany,
    createProduct,
    deleteMany,
    deleteProduct,
    updateProduct,
    singleProduct,
    allProducts,
    getProductCategory
}
