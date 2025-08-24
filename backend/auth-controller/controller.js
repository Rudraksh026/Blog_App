const { user } = require("../model/user-model");
const path = require("path");
const home = async (req, res) => {
  res.send("Home");
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existUser = await user.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordMatched = await existUser.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({ message: "Login successful", existUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existUser = await user.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const response = await user.create({ name, email, password });
    console.log(response);
    return res
      .status(201)
      .json({ message: "User created successfully", response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addBlog = async (req, res) => {
  try {
    const { title, content, category, date, email } = req.body;

    // Find user by email
    const response = await user.findOne({ email });
    if (!response) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // File URL (if uploaded)
    const coverImageUrl = req.file
      ? `https://blog-app-13pi.onrender.com/uploads/${req.file.filename}`
      : "";

    // Push new blog into user's addBlog array
    response.addBlog.push({
      title,
      coverImage: coverImageUrl,
      content,
      category,
      date,
    });

    // Save changes
    await response.save();

    res.status(200).json({ message: "Blog Uploaded Successfully" });
  } catch (error) {
    console.error("Error in addBlog:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};


const getBlog = async(req,res) => {
  try {
    const users = await user.find({}, "name addBlog").lean();

    let allBlogs = [];
    users.forEach(user => {
      if (user.addBlog && user.addBlog.length > 0) {
        const blogsWithName = user.addBlog.map(blog => ({
          ...blog,
          authorName: user.name,
        }));
        allBlogs = allBlogs.concat(blogsWithName);
      }
    });

    const sortedBlogs = allBlogs.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.status(200).json(sortedBlogs);
  } catch (error) {
    console.log(error)
    res.status(401).json({error});
  }
}

const getBlogById = async(req,res) => {
  try {
    const blogId = req.params.blogId;

    const temp = await user.findOne(
      { "addBlog._id": blogId },
      { name: 1, addBlog: 1 }
    ).lean();

    if (!temp) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const blog = temp.addBlog.find(
      (b) => b._id.toString() === blogId.toString()
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const blogWithAuthor = {
      ...blog,
      authorName: temp.name,
    };

    res.status(200).json(blogWithAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { home, login, signup, addBlog,getBlog,getBlogById };
