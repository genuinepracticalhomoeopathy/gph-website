import React from 'react';
import Image from 'next/image';
const AboutSection: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-gray-50 text-black">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-text">
                    Meet Your Instructor
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/2">
                        <Image
                            src="/tutor.png"
                            alt="Dr. Santosh Mahanwar"
                            className="rounded-lg shadow-lg w-full object-cover aspect-[3/5]"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <div className="inline-block bg-[#179E25] rounded-full px-4 py-1 mb-4 text-sm text-white font-medium">
                            Senior Homeopathy Expert
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-black">Dr. Santosh Mahanwar</h3>
                        <p className="text-text/80 mb-6">
                        Dr. Santosh Mahanwar is a leading GENUINE PRACTICAL HOMOEOPATH, the founder of the MIASMA HOMOEO CLINIC chain, and the Head of Department at SKHMC, Beed. He has trained thousands of homoeopaths across the state and is renowned for his meticulous work on the teachings of Master Hahnemann and his genuine followers. Through deep study and practical insight, he decoded the authentic principles of homoeopathy and developed impactful online training programs, courses, webinars, and seminars aimed at homoeopaths struggling to achieve success in their practice. With a mission-driven approach, he is dedicated to transforming the lives of struggling homoeopaths by helping them enhance their clinical skills, boost their confidence, increase their earnings, and improve their overall quality of life—ultimately shaping them into proud GENUINE PRACTICAL HOMOEOPATHS.



                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="bg-accent rounded-full p-1 mr-3 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-text">Professional Certification</h4>
                                    <p className="text-text/70">MD Homoeopath</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-accent rounded-full p-1 mr-3 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-text">Clinical Experience</h4>
                                    <p className="text-text/70">25+ years of clinical practice and teaching experience in homeopathic medicine</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-accent rounded-full p-1 mr-3 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-text">Research & Publications</h4>
                                    <p className="text-text/70">Published author with numerous research papers in homeopathic journals</p>
                                </div>
                            </div>
                        </div>
                        <button className="mt-8 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full transition-colors inline-flex items-center gap-2">
                            View Full Profile
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;