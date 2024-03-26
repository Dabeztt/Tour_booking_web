import Booking from "../models/Booking.js"

//tao booking
export const createBooking = async (req, res) => {

    const newBooking = new Booking(req.body)

    try {

        const savedBooking = await newBooking.save()

        res.status(200).json({ success: true, message: 'Your tour is booked', data: savedBooking })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal sever error' })
    }
}

//get 1 booking
export const getBooking = async (req, res) => {
    const id = req.params.id

    try {
        const book = await Booking.findById(id)

        res.status(200).json({ success: true, message: 'Successful', data: book })

    } catch (err) {
        res.status(404).json({ success: false, message: 'Not found' })
    }
}

//get all booking
export const getAllBooking = async (req, res) => {

    try {
        const books = await Booking.find()

        res.status(200).json({ success: true, message: 'Successful', data: books })

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal sever error' })
    }
}

//sua booking
export const updateBooking = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, newData, { new: true });
        res.status(200).json({ success: true, message: 'Booking updated successfully', data: updatedBooking });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//xoa booking
export const deleteBooking = async (req, res) => {
    const id = req.params.id;

    try {
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}