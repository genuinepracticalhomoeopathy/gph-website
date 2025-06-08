'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Image from 'next/image';

const CoursePage = () => {
    const problems = [
        "Confusing methods and systems of practice",
        "Overwhelming knowledge only",
        "Impractical and unscientific case taking methods",
        "Misunderstanding and wrong way of application of law of similia",
        "Miasm misunderstanding and misinterpretation",
        "lac of clinical utilising skill",
        "Unscientific, imaginary Materia medica and repertories",
        "No standard step by step protocols for selection of remedy",
        "Unaware about LM Potency utilising skills",
        "Don't aware about either your remedy is right or either it is wrong",
        "How to manage a follow up",
        "Unaware about financial, business, digital marketing skills",
        "No earning and no respect"
    ];

    const courses = [
        {
            title: "Introductory GPH Course",
            duration: "8 weeks",
            price: "₹999",
            description: "Master the fundamentals of Genuine Practical Homoeopathy with our comprehensive introductory course.",
            highlights: [
                "Master core principles of Homoeopathy",
                "Learn actionable General Principles of Homoeopathy (GPH)",
                "Apply theory to real-world clinical practice",
                "Gain clarity through a scientific lens",
                "Step-by-step guide to LM potency",
                "Simplified insights into miasmatic theory",
                "Strategies to amplify practice results",
                "Practical tools for better patient outcomes",
                "Bonus materials for deeper learning",
                "Transform your practice with proven methods"
            ],
            image: "/courseImg1.png",
            tag: "Best for Beginners",
            videoUrl: "https://kxgep.courses.store/614237?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
            slug: "introductory-gph"
        },
        {
            title: "Acute Management System",
            duration: "12 weeks",
            price: "₹6999",
            description: "Learn to effectively manage acute cases with confidence and precision using proven protocols.",
            highlights: [
                "Advanced case management techniques",
                "Emergency case handling protocols",
                "Rapid assessment methodologies",
                "Precise remedy selection process",
                "Dosage and potency management",
                "Follow-up strategies for acute cases",
                "Clinical decision-making skills",
                "Documentation and case recording",
                "Patient communication in acute situations",
                "Integration with conventional medicine"
            ],
            image: "/courseImg2.png",
            tag: "Most Popular",
            videoUrl: "https://kxgep.courses.store/611647?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
            slug: "acute-management"
        },
        {
            title: "GPH Advanced Course",
            duration: "16 weeks",
            price: "₹24,999",
            description: "Take your practice to the next level with advanced concepts and specialized therapeutic approaches.",
            highlights: [
                "Complex case management",
                "Advanced miasmatic analysis",
                "Chronic disease management",
                "Constitutional treatment mastery",
                "Advanced posology principles",
                "Research methodology integration",
                "Practice management excellence",
                "Advanced clinical strategies",
                "Specialized therapeutic approaches",
                "Professional development guidance"
            ],
            image: "/courseImg3.png",
            tag: "Advanced Level",
            videoUrl: "https://kxgep.courses.store/230968?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
            slug: "advanced-gph"
        },
        {
            title: "Introductry course on Diabities",
            duration: "1 weeks",
            price: "₹1",
            description: "This is GPH Introductory Course on Diabetes, this course is free, you only have to pay 1 rupee as a nominal fee so you can get all the extra features of the course with it!",
            highlights: [
                "Comprehensive understanding of diabetes",
                "Understanding the role of diabetes in the body",
                "Identifying and managing diabetes",
                "Understanding the signs and symptoms of diabetes",
                "Managing diabetes through medication",
                "Understanding the importance of a healthy lifestyle",

            ],
            image: "/courseImg4.png",
            tag: "Beginner Level",
            videoUrl: "https://kxgep.courses.store/230968?utm_source%3Dother%26utm_medium%3Dtutor-course-referral%26utm_campaign%3Dcourse-overview-webapp",
            slug: "begineer-gph"
        },

    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-6xl font-bold text-gray-900 mb-6">
                            Transform Your Practice
                            <span className="block text-[#179E25] mt-2">With GPH Courses</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover our comprehensive learning pathways designed to elevate your homoeopathic practice
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#179E25] rounded-3xl transform rotate-3 opacity-10"></div>
                            <Image
                                width={1000}
                                height={1000}
                                src="/student.png"
                                alt="Genuine Practical Homoeopathy Student"
                                className="relative rounded-3xl shadow-2xl w-full object-cover h-[600px]"
                            />
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-4xl font-bold text-gray-900 mb-8">
                                Are You Experiencing These
                                <span className="block text-[#179E25] mt-2">Challenges?</span>
                            </h2>
                            <ul className="space-y-4">
                                {problems.map((problem, index) => (
                                    <li key={index} className="flex items-start space-x-4 p-4 bg-red-50 rounded-xl">
                                        <svg className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span className="text-gray-800 font-medium">{problem}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Listings */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                        Choose Your Learning Path
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {courses.map((course, index) => (
                            <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                <Link href={course.videoUrl}>
                                    <div className="relative group cursor-pointer">
                                        <Image
                                            width={1000}
                                            height={1000}
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="bg-white rounded-full p-4 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                <svg className="w-8 h-8 text-[#179E25]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white py-1 px-4 rounded-full text-sm font-semibold text-[#179E25] shadow-lg">
                                            {course.tag}
                                        </div>
                                    </div>
                                </Link>
                                <div className="p-8">
                                    <Link href={course.videoUrl}>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-[#179E25] transition-colors">{course.title}</h3>
                                    </Link>
                                    <div className="flex items-center space-x-4 mb-6">
                                        <span className="bg-[#179E25]/10 text-[#179E25] text-sm font-semibold py-1.5 px-4 rounded-full">
                                            {course.duration}
                                        </span>
                                        <span className="text-2xl font-bold text-[#179E25]">{course.price}</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">{course.description}</p>
                                    <ul className="space-y-3">
                                        {course.highlights.map((highlight, idx) => (
                                            <li key={idx} className="flex items-start space-x-3">
                                                <svg className="h-5 w-5 text-[#179E25] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-8 bg-gray-50 border-t border-gray-100">
                                    <Link href={course.videoUrl}>
                                        <button className="w-full bg-[#179E25] text-white py-4 px-6 rounded-full font-semibold hover:bg-[#179E25]/90 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2">
                                            <span>Enroll Now!</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CoursePage;