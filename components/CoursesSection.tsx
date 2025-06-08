'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CourseProps {
    title: string;
    description: string;
    duration: string;
    price: string;
    image: string;
}

const CourseCard: React.FC<CourseProps> = ({ title, description, duration, price, image }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`https://kxgep.courses.store/`} className="flex flex-col h-full">
                <div className="relative overflow-hidden">
                    <Image
                        width={100}
                        height={100}
                        src={image || "/image.png"}
                        alt={title}
                        className={`w-full h-64 object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm py-2 px-4 rounded-full text-sm font-bold text-[#179E25] shadow-md">
                        {price}
                    </div>
                </div>
                <div className="p-8 flex flex-col flex-grow bg-gray-50/50">
                    <div className="flex items-center mb-4">
                        <span className="bg-[#179E25]/10 text-[#179E25] text-sm font-semibold py-1.5 px-4 rounded-full">{duration}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 line-clamp-2 hover:text-[#179E25] transition-colors">{title}</h3>
                    <p className="text-gray-600 mb-8 flex-grow text-base line-clamp-4">{description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            <span className="text-sm text-gray-600 ml-2 font-medium">(120)</span>
                        </div>
                        <button className="bg-[#179E25] hover:bg-[#179E25]/90 text-white py-2.5 px-6 rounded-full transition-colors text-sm font-semibold shadow-md hover:shadow-lg">
                            Enroll Now
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const CoursesSection: React.FC = () => {
    const courses = [
        {
            title: "Introductory course on Genuine Practical Homoeopathy",
            description: `Introductory Course on Genuine Practical Homoeopathy
Unlock the power of Homoeopathy with a practical, science-based approach.

Key Highlights:

Master core principles of Homoeopathy

Learn actionable General Principles of Homoeopathy (GPH)

Apply theory to real-world clinical practice

Gain clarity through a scientific lens

Step-by-step guide to LM potency

Simplified insights into miasmatic theory

Strategies to amplify practice results

Practical tools for better patient outcomes

Bonus materials for deeper learning

Transform your practice with proven methods`,
            duration: "4 weeks",
            price: "₹999",
            image: "/image.png",
        },
        {
            title: "Acute Management System",
            description: "Gain the confidence and skills to manage acute cases effectively with this focused course designed for Homoeopathic practitioners, students, and beginners. Learn a structured, step-by-step approach to acute case-taking, remedy selection using a simplified seven-step protocol, and overcome common doubts in acute prescribing. Dive deep into core remedies like Aconite, Belladonna, Nux Vomica, and specialized remedies for acute psychotic episodes. With proven methodologies and practical tools, this course equips you to deliver consistent, impactful results in acute care.",
            duration: "8 weeks",
            price: "₹6,999",
            image: "/image.png",
        },
        {
            title: "GPH Advanced Course",
            description: "Unlock the full potential of Hahnemannian Homoeopathy with this advanced course, tailored for students, interns, PG scholars, MDs, and experienced practitioners. Strengthen your foundation, clear doubts, and shift toward a scientific, result-oriented mindset. Learn to apply principles effectively in daily practice, master case selection, and understand why remedies work or fail. Join a supportive community, access a proven system, and accelerate your growth—both professionally and financially—through our Educate, Engage, and Earn approach.",
            duration: "12 weeks",
            price: "₹24,999",
            image: "/image.png",
        },
    ];

    return (
        <section id="courses" className="py-24 bg-white w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        Our Featured Courses
                    </h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Expand your knowledge and skills with our professionally designed courses
                        tailored to meet your learning needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {courses.map((course, index) => (
                        <CourseCard key={index} {...course} />
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="bg-[#179E25] text-white hover:bg-[#179E25]/90 font-bold py-4 px-10 rounded-full transition-colors text-lg shadow-md hover:shadow-xl">
                        View All Courses
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;