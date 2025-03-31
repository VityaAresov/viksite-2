import React from 'react';
import BlogCard from './BlogCard'; 
import styles from './BlogSection.module.css'; 


interface BlogPost {
    id: string;
    imageUrl: string;
    category: string;
    title: string;
    date: string; 
    link: string; 
}


const blogPostsData: BlogPost[] = [
    {
        id: 'b1',
        imageUrl: '/images/blog_image.png', 
        category: 'Design',
        title: 'Our design process explained',
        date: 'April 27, 2025',
        link: '/blog/design-process',
    },
    {
        id: 'b2',
        imageUrl: '/images/blog_image.png', 
        category: 'SEO',
        title: 'Our design process explained. Our design process explained', 
        date: 'February 12, 2024',
        link: '/blog/seo-explained',
    },
    {
        id: 'b3',
        imageUrl: '/images/blog_image.png',
        category: 'Marketing',
        title: 'Our design process explained',
        date: 'January 29, 2024',
        link: '/blog/marketing-process',
    },
    
];



const BlogSection: React.FC = () => {
    return (
        <section className={styles.blogSection}>
            {}
            {}
            <div className={styles.container}>
                {}
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        Digital Marketing & SEO Services That Grow Traffic & Increase Revenue
                    </h2>
                    <div className={styles.headerContent}>
                        <p className={styles.description}>
                            We are the top digital marketing agency for branding corp. We offer a full range
                            of services to help clients improve their search engine rankings and drive more
                            traffic to their websites.
                        </p>
                        <a href="/blog" className={styles.seeMoreButton}>
                            See more
                        </a>
                    </div>
                </div>

                {}
                <div className={styles.blogGrid}>
                    {blogPostsData.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;