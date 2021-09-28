import setuptools

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setuptools.setup(
    name="st-datatables",
    version="0.0.1",
    author="ljnsn",
    author_email="ljnsn@users.noreply.github.com",
    description="A streamlit component to render pandas DataFrames as jQuery DataTables.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/ljnsn/st-datatables",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.8",
    install_requires=[
        # By definition, a Custom Component depends on Streamlit.
        # If your component has other Python dependencies, list
        # them here.
        "streamlit >= 0.89.0",
        "pandas >= 1.2",
    ],
)
