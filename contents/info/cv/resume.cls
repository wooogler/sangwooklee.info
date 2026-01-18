\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}[2014/08/16 Resume class]

\LoadClass[12pt,letter]{article}

\usepackage{fontawesome5}
\usepackage{times}
\usepackage{enumitem}
\usepackage[top=2.54cm,bottom=2.54cm,right=2.54cm,left=2.54cm]{geometry}

\setlength{\parindent}{0em}
\setlist{nosep,left=0em,labelindent=5pt,labelwidth=1.25em}

\newcommand{\@name}[1]{Your Name}
\newcommand{\name}[1]{\renewcommand{\@name}{#1}}
\def \makename {\huge\textbf\@name}

\newcommand*\@contacts{}
\newcommand*\contact[1]{
    \ifx\features\empty {\def\features{\par#1}}
    \else {\g@addto@macro\@contacts{\par#1}} % append \contact to \@contacts
    \fi
}
\def \makecontact{\llap{\parbox{\textwidth}{\footnotesize\raggedleft\@contacts}}}

\def \makeheader {\makebox[\textwidth]{\hfill\makename\hfill\makecontact}}

\newenvironment{ResumeSection}[1]{
    \MakeUppercase{\bf #1}
    \smallskip\hrule\medskip
}{
    \bigskip
}

\define@key{subsection}{org}{\def\subsection@org{#1}}
\define@key{subsection}{location}{\def\subsection@location{#1}}
\define@key{subsection}{position}{\def\subsection@position{#1}}
\define@key{subsection}{duration}{\def\subsection@duration{#1}}
\newenvironment{ResumeSubsection}[1]{
    \setkeys{subsection}{org=,location=,position=,duration=}
    \setkeys{subsection}{#1}
    \smallskip
    \par\textbf\subsection@org\hfill\subsection@location
    \ifx\subsection@position\empty {}
    \else {\par{\em\subsection@position}\hfill{\em\subsection@duration}}
    \fi
}{
    \bigskip
}

\define@key{publication}{title}{\def\publication@title{#1}}
\define@key{publication}{author}{\def\publication@author{#1}}
\define@key{publication}{publisher}{\def\publication@publisher{#1}}
\newenvironment{PublicationEntry}[1]{
    \setkeys{publication}{title=,author=,publisher=}
    \setkeys{publication}{#1}
    \smallskip
    \par\textbf{\publication@title}
    \ifx\publication@author\empty {}
    \else {\par{\publication@author}}
    \fi
    \ifx\publication@publisher\empty {}
    \else {\par{\em\publication@publisher}}
    \fi
}{
    \bigskip
}

\newenvironment{PublicationSection}[1]{
    \MakeUppercase{\bf #1}
    \smallskip\hrule\medskip
}{
    \bigskip
}

