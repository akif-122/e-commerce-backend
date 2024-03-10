const contactModel = require('../models/contactModel');
class contactController {
  // static contact = async (req, res) => {
  //   try {
  //     const { name, email, subject, message } = req.body;
  //     console.log(name + " " + email + " " + subject + " " + message)

  //     const transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         user: "Akifullah0317@gmail.com",
  //         pass: "afvuaecfnzhejtmd"
  //       },
  //       port: 456,
  //       host: "smtp.gmail.com"

  //     })

  //     var mailOptions = {
  //       // from: email,
  //       to: 'akifullah0317@gmail.com',
  //       subject: subject,
  //       text: `${name}! ${message}. <br/><br/> ${email} `
  //     };


  //     transporter.sendMail(mailOptions, function (error, info) {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log('Email sent: ' + info.response);
  //       }
  //     });

  //     return res.status(200).send({ message: "Thanks! We will contact you soon." })
  //   } catch (error) {

  //   }
  // }
  static addContact = async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        return res.status(400).send({ success: false, message: "All Field are required!" });

      }
      const contact = await contactModel({
        name, email, subject, message
      }).save();

      if (contact) {
        return res.status(201).send({ success: true, message: "Thanks! I will reach you soon." });
      }



    } catch (error) {
      console.log(error)
      return res.status(500).send({ success: false, message: "Something wrong!" });
    }
  }

  static allContact = async (req, res) => {
    try {

      const allContact = await contactModel.find();
      if (allContact) {
        return res.status(200).send({ success: true, message: "All Contacts", allContact });

      }

    } catch (error) {
      console.log(error);
      return res.status(500).send({ success: false, message: "Something Wrong!" });
    }
  }

  // DELETE CONTACT
  static deleteContact = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedContact = await contactModel.findByIdAndDelete(id);
      if (deletedContact) {
        return res.status(200).send({ success: true, message: "Contact Deleted" });
      } else {
        return res.status(400).send({ success: false, message: "Deleting Operation failed." });
      }

    } catch (error) {
      console.log(error);
      return res.status(500).send({ success: false, message: "Something Wrong!" });
    }
  }


}

module.exports = contactController;