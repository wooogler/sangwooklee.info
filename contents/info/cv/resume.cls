\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}[2026/09/23 Academic CV class, left date column]

\LoadClass[11pt,letterpaper]{article}

\RequirePackage{fontspec}
\setmainfont{LibertinusSerif}[Extension=.otf,UprightFont=*-Regular,BoldFont=*-Bold,ItalicFont=*-Italic,BoldItalicFont=*-BoldItalic]
\RequirePackage[top=0.7in,bottom=0.65in,left=0.8in,right=0.8in]{geometry}
\RequirePackage{enumitem}
\RequirePackage{xcolor}
\RequirePackage{needspace}
\RequirePackage{fancyhdr}
\RequirePackage{hyperref}
\hypersetup{colorlinks=true,urlcolor=black,linkcolor=black,citecolor=black}
\definecolor{linkblue}{HTML}{4A6A80}
% colored link (header contacts, publication titles); plain \href stays black but clickable
\newcommand{\clink}[2]{{\hypersetup{urlcolor=linkblue}\href{#1}{#2}}}
\definecolor{rulegray}{HTML}{999999}
\definecolor{notegray}{HTML}{555555}
\definecolor{awardred}{HTML}{A0321E}
\RequirePackage{pifont}

\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}
\hyphenpenalty=10000
\exhyphenpenalty=10000
\tolerance=2000
\emergencystretch=2em
\raggedbottom

% ---------- page footer ----------
\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\fancyfoot[C]{\footnotesize\color{notegray}\thepage}
\fancyfoot[R]{\footnotesize\color{notegray}\@lastupdated}
\newcommand{\@lastupdated}{}
\newcommand{\lastupdated}[1]{\renewcommand{\@lastupdated}{#1}}

% ---------- header ----------
\newcommand{\@name}{}
\newcommand{\@tagline}{}
\newcommand{\@links}{}
\newcommand{\name}[1]{\renewcommand{\@name}{#1}}
\newcommand{\tagline}[1]{\renewcommand{\@tagline}{#1}}
\newcommand{\links}[1]{\renewcommand{\@links}{#1}}
\newcommand{\makeheader}{%
  {\fontsize{21}{25}\selectfont\bfseries\@name\par}
  \vspace{4pt}
  {\@tagline\par}
  \vspace{3pt}
  {\small\@links\par}
  \vspace{9pt}{\color{rulegray}\hrule height 0.5pt}\vspace{2pt}
}

% ---------- sections ----------
\newcommand{\cvsection}[1]{%
  \Needspace{4\baselineskip}
  \vspace{9pt}
  {\fontsize{13}{15}\selectfont\bfseries #1\par}
  \vspace{6pt}
}
\newcommand{\cvsubsection}[1]{%
  \Needspace{3\baselineskip}
  \vspace{3pt}{\small\bfseries\color{notegray}#1\par}\vspace{2pt}
}

% ---------- date-column entries ----------
\newlength{\datecol}\setlength{\datecol}{1.15in}
\newlength{\labelgap}\setlength{\labelgap}{0.15in}
\newenvironment{entries}{%
  \begin{list}{}{%
    \setlength{\leftmargin}{\dimexpr\datecol+\labelgap\relax}%
    \setlength{\labelwidth}{\datecol}%
    \setlength{\labelsep}{\labelgap}%
    \setlength{\itemsep}{5pt}\setlength{\parsep}{0pt}%
    \setlength{\topsep}{0pt}\setlength{\partopsep}{0pt}%
    \setlength{\itemindent}{0pt}\setlength{\listparindent}{0pt}%
    \renewcommand{\makelabel}[1]{\raggedright\small ##1\hfil}%
  }\raggedright}{\end{list}}
\newcommand{\entry}[2]{\needspace{3\baselineskip}\item[{#1}] #2}
% org/role line: role, org, location
\newcommand{\role}[3]{#1, \textbf{#2}\ifx\relax#3\relax\else, #3\fi}
\newcommand{\mentor}[1]{{\small #1}}
\newcommand{\desc}[1]{\par{\small\itshape #1}}
% project block inside an entry
\newcommand{\project}[3]{\par\vspace{3pt}\textbf{#1}\ifx\relax#2\relax\else\ {\small\itshape #2}\fi\par{\small #3}}

% ---------- publications ----------
\newenvironment{publist}{%
  \begin{list}{}{%
    \setlength{\leftmargin}{0.45in}\setlength{\labelwidth}{0.35in}%
    \setlength{\labelsep}{0.1in}\setlength{\itemsep}{5pt}%
    \setlength{\parsep}{0pt}\setlength{\topsep}{0pt}\setlength{\partopsep}{0pt}%
    \renewcommand{\makelabel}[1]{\small ##1\hfil}%
  }}{\end{list}}
% \pub{label}{authors}{year}{title}{venue}{note}
\newcommand{\pub}[6]{\needspace{2\baselineskip}\item[{#1}] #2. #3. #4. {\itshape #5.}\ifx\relax#6\relax\else\par{\color{awardred}\bfseries\ding{72}\ #6}\fi}
\newcommand{\me}{\textbf{Sangwook Lee}}
