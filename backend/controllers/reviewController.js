import Tour from "../models/Tour.js"
import Review from "../models/Review.js"

export const createReview = async (req, res) => {
    const tourId = req.params.tourId
    const newReview = new Review({ ...req.body })

    try {

        const savedReview = await newReview.save()

        //update review
        await Tour.findByIdAndUpdate(tourId, {
            $push: { reviews: savedReview._id }
        })

        res.status(200).json({ success: true, message: 'Review submitted', data: savedReview })

    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to submit' })
    }
}

export const getAllReview = async (req, res) => {

    try {
        const reviews = await Review.find();

        res.status(200).json({ success: true, data: reviews });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
    }
};

//sua review
export const updateReview = async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    try {
        const updatedReview = await Review.findByIdAndUpdate(id, newData, { new: true });
        res.status(200).json({ success: true, message: 'Review updated successfully', data: updatedReview });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update review' });
    }
}

//xoa review
export const deleteReview = async (req, res) => {
    const id = req.params.id;

    try {
        await Review.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete review' });
    }
}