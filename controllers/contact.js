const Contact = require("../models/contact");

exports.create = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const contactObj = {
      name: req.body.name,
      phone: req.body.phone,
    };

    if (req.file) {
      contactObj.image = `http://localhost:8000${req.file.path}`.replace(
        "public",
        ""
      );
    }

    console.log("contactjs", contactObj);
    const contact = await new Contact(contactObj).save();
    res.json(contact);
  } catch (err) {
    res.status(400).send("Contact creation failed");
  }
};

exports.list = async (req, res) => {
  res.json(await Contact.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  let contact = await Contact.findOne({ slug: req.params.slug }).exec();
  res.json(contact);
};

exports.update = async (req, res) => {
  const { name, phone } = req.body;
  const id = req.params.id;
  let image = "";
  if (req.file) {
    await file.mv(`${__dirname}/client/public/images/${file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      image = `/images/${file.name}`;
      res.json({ fileName: file.name, filePath: `/images/${file.name}` });
    });
  }
  try {
    const updated = await Contact.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        image,
      },
      {
        new: true,
      }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Create update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndRemove(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Contact deletion failed.");
  }
};
