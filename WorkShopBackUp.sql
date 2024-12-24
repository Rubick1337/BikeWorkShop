PGDMP      #                |            WorkShop    17.0    17.0 w    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    53296    WorkShop    DATABASE     ~   CREATE DATABASE "WorkShop" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "WorkShop";
                     postgres    false            �            1259    53418    Baskets    TABLE     )  CREATE TABLE public."Baskets" (
    id integer NOT NULL,
    id_user integer NOT NULL,
    cost numeric,
    status character varying(255) NOT NULL,
    date timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Baskets";
       public         heap r       postgres    false            �            1259    53417    Baskets_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Baskets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Baskets_id_seq";
       public               postgres    false    239            �           0    0    Baskets_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Baskets_id_seq" OWNED BY public."Baskets".id;
          public               postgres    false    238            �            1259    53466 
   BikeOrders    TABLE     �   CREATE TABLE public."BikeOrders" (
    id integer NOT NULL,
    id_bike integer NOT NULL,
    id_basket integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."BikeOrders";
       public         heap r       postgres    false            �            1259    53465    BikeOrders_id_seq    SEQUENCE     �   CREATE SEQUENCE public."BikeOrders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."BikeOrders_id_seq";
       public               postgres    false    245            �           0    0    BikeOrders_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."BikeOrders_id_seq" OWNED BY public."BikeOrders".id;
          public               postgres    false    244            �            1259    53399    Bikes    TABLE     �  CREATE TABLE public."Bikes" (
    id integer NOT NULL,
    id_type_bike integer NOT NULL,
    id_category_bike integer NOT NULL,
    name character varying(255) NOT NULL,
    price numeric NOT NULL,
    model character varying(255) NOT NULL,
    brand character varying(255) NOT NULL,
    description text NOT NULL,
    img character varying(255) NOT NULL,
    "inSell" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Bikes";
       public         heap r       postgres    false            �            1259    53398    Bikes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Bikes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Bikes_id_seq";
       public               postgres    false    237            �           0    0    Bikes_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Bikes_id_seq" OWNED BY public."Bikes".id;
          public               postgres    false    236            �            1259    53392    CategoryBikes    TABLE     �   CREATE TABLE public."CategoryBikes" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."CategoryBikes";
       public         heap r       postgres    false            �            1259    53391    CategoryBikes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CategoryBikes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."CategoryBikes_id_seq";
       public               postgres    false    235            �           0    0    CategoryBikes_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."CategoryBikes_id_seq" OWNED BY public."CategoryBikes".id;
          public               postgres    false    234            �            1259    53359    CategoryParts    TABLE     �   CREATE TABLE public."CategoryParts" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."CategoryParts";
       public         heap r       postgres    false            �            1259    53358    CategoryParts_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CategoryParts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."CategoryParts_id_seq";
       public               postgres    false    229            �           0    0    CategoryParts_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."CategoryParts_id_seq" OWNED BY public."CategoryParts".id;
          public               postgres    false    228            �            1259    53326    CategoryServices    TABLE     �   CREATE TABLE public."CategoryServices" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 &   DROP TABLE public."CategoryServices";
       public         heap r       postgres    false            �            1259    53325    CategoryServices_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CategoryServices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."CategoryServices_id_seq";
       public               postgres    false    223            �           0    0    CategoryServices_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."CategoryServices_id_seq" OWNED BY public."CategoryServices".id;
          public               postgres    false    222            �            1259    53449 
   PartOrders    TABLE     �   CREATE TABLE public."PartOrders" (
    id integer NOT NULL,
    id_part integer NOT NULL,
    id_basket integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."PartOrders";
       public         heap r       postgres    false            �            1259    53448    PartOrders_id_seq    SEQUENCE     �   CREATE SEQUENCE public."PartOrders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."PartOrders_id_seq";
       public               postgres    false    243            �           0    0    PartOrders_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."PartOrders_id_seq" OWNED BY public."PartOrders".id;
          public               postgres    false    242            �            1259    53366    Parts    TABLE     �  CREATE TABLE public."Parts" (
    id integer NOT NULL,
    id_type_part integer NOT NULL,
    id_category_part integer NOT NULL,
    name character varying(255) NOT NULL,
    price numeric NOT NULL,
    model character varying(255) NOT NULL,
    brand character varying(255) NOT NULL,
    description text NOT NULL,
    img character varying(255) NOT NULL,
    "inSell" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Parts";
       public         heap r       postgres    false            �            1259    53365    Parts_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Parts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Parts_id_seq";
       public               postgres    false    231            �           0    0    Parts_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Parts_id_seq" OWNED BY public."Parts".id;
          public               postgres    false    230            �            1259    53306    Refresh_tokens    TABLE     �   CREATE TABLE public."Refresh_tokens" (
    id_user integer NOT NULL,
    refresh_token text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 $   DROP TABLE public."Refresh_tokens";
       public         heap r       postgres    false            �            1259    53432    ServiceOrders    TABLE     �   CREATE TABLE public."ServiceOrders" (
    id integer NOT NULL,
    id_service integer NOT NULL,
    id_basket integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 #   DROP TABLE public."ServiceOrders";
       public         heap r       postgres    false            �            1259    53431    ServiceOrders_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ServiceOrders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."ServiceOrders_id_seq";
       public               postgres    false    241            �           0    0    ServiceOrders_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."ServiceOrders_id_seq" OWNED BY public."ServiceOrders".id;
          public               postgres    false    240            �            1259    53333    Services    TABLE     �  CREATE TABLE public."Services" (
    id integer NOT NULL,
    id_type_service integer NOT NULL,
    id_category_service integer NOT NULL,
    name character varying(255) NOT NULL,
    price numeric NOT NULL,
    description text NOT NULL,
    "inSell" boolean NOT NULL,
    img character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Services";
       public         heap r       postgres    false            �            1259    53332    Services_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Services_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Services_id_seq";
       public               postgres    false    225            �           0    0    Services_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Services_id_seq" OWNED BY public."Services".id;
          public               postgres    false    224            �            1259    53385 	   TypeBikes    TABLE     �   CREATE TABLE public."TypeBikes" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."TypeBikes";
       public         heap r       postgres    false            �            1259    53384    TypeBikes_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TypeBikes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."TypeBikes_id_seq";
       public               postgres    false    233            �           0    0    TypeBikes_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."TypeBikes_id_seq" OWNED BY public."TypeBikes".id;
          public               postgres    false    232            �            1259    53352 	   TypeParts    TABLE     �   CREATE TABLE public."TypeParts" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."TypeParts";
       public         heap r       postgres    false            �            1259    53351    TypeParts_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TypeParts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."TypeParts_id_seq";
       public               postgres    false    227            �           0    0    TypeParts_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."TypeParts_id_seq" OWNED BY public."TypeParts".id;
          public               postgres    false    226            �            1259    53319    TypeServices    TABLE     �   CREATE TABLE public."TypeServices" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."TypeServices";
       public         heap r       postgres    false            �            1259    53318    TypeServices_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TypeServices_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."TypeServices_id_seq";
       public               postgres    false    221            �           0    0    TypeServices_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."TypeServices_id_seq" OWNED BY public."TypeServices".id;
          public               postgres    false    220            �            1259    53298    Users    TABLE     �  CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    adress character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap r       postgres    false            �            1259    53297    Users_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Users_id_seq";
       public               postgres    false    218            �           0    0    Users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;
          public               postgres    false    217            �           2604    53421 
   Baskets id    DEFAULT     l   ALTER TABLE ONLY public."Baskets" ALTER COLUMN id SET DEFAULT nextval('public."Baskets_id_seq"'::regclass);
 ;   ALTER TABLE public."Baskets" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    238    239    239            �           2604    53469    BikeOrders id    DEFAULT     r   ALTER TABLE ONLY public."BikeOrders" ALTER COLUMN id SET DEFAULT nextval('public."BikeOrders_id_seq"'::regclass);
 >   ALTER TABLE public."BikeOrders" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    244    245    245            �           2604    53402    Bikes id    DEFAULT     h   ALTER TABLE ONLY public."Bikes" ALTER COLUMN id SET DEFAULT nextval('public."Bikes_id_seq"'::regclass);
 9   ALTER TABLE public."Bikes" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    236    237    237            �           2604    53395    CategoryBikes id    DEFAULT     x   ALTER TABLE ONLY public."CategoryBikes" ALTER COLUMN id SET DEFAULT nextval('public."CategoryBikes_id_seq"'::regclass);
 A   ALTER TABLE public."CategoryBikes" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    235    234    235            �           2604    53362    CategoryParts id    DEFAULT     x   ALTER TABLE ONLY public."CategoryParts" ALTER COLUMN id SET DEFAULT nextval('public."CategoryParts_id_seq"'::regclass);
 A   ALTER TABLE public."CategoryParts" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    229    228    229            �           2604    53329    CategoryServices id    DEFAULT     ~   ALTER TABLE ONLY public."CategoryServices" ALTER COLUMN id SET DEFAULT nextval('public."CategoryServices_id_seq"'::regclass);
 D   ALTER TABLE public."CategoryServices" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    223    222    223            �           2604    53452    PartOrders id    DEFAULT     r   ALTER TABLE ONLY public."PartOrders" ALTER COLUMN id SET DEFAULT nextval('public."PartOrders_id_seq"'::regclass);
 >   ALTER TABLE public."PartOrders" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    242    243    243            �           2604    53369    Parts id    DEFAULT     h   ALTER TABLE ONLY public."Parts" ALTER COLUMN id SET DEFAULT nextval('public."Parts_id_seq"'::regclass);
 9   ALTER TABLE public."Parts" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    230    231    231            �           2604    53435    ServiceOrders id    DEFAULT     x   ALTER TABLE ONLY public."ServiceOrders" ALTER COLUMN id SET DEFAULT nextval('public."ServiceOrders_id_seq"'::regclass);
 A   ALTER TABLE public."ServiceOrders" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    241    240    241            �           2604    53336    Services id    DEFAULT     n   ALTER TABLE ONLY public."Services" ALTER COLUMN id SET DEFAULT nextval('public."Services_id_seq"'::regclass);
 <   ALTER TABLE public."Services" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    225    225            �           2604    53388    TypeBikes id    DEFAULT     p   ALTER TABLE ONLY public."TypeBikes" ALTER COLUMN id SET DEFAULT nextval('public."TypeBikes_id_seq"'::regclass);
 =   ALTER TABLE public."TypeBikes" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    233    232    233            �           2604    53355    TypeParts id    DEFAULT     p   ALTER TABLE ONLY public."TypeParts" ALTER COLUMN id SET DEFAULT nextval('public."TypeParts_id_seq"'::regclass);
 =   ALTER TABLE public."TypeParts" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    227    226    227            �           2604    53322    TypeServices id    DEFAULT     v   ALTER TABLE ONLY public."TypeServices" ALTER COLUMN id SET DEFAULT nextval('public."TypeServices_id_seq"'::regclass);
 @   ALTER TABLE public."TypeServices" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    220    221            �           2604    53301    Users id    DEFAULT     h   ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);
 9   ALTER TABLE public."Users" ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218            }          0    53418    Baskets 
   TABLE DATA           ^   COPY public."Baskets" (id, id_user, cost, status, date, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    239   *�       �          0    53466 
   BikeOrders 
   TABLE DATA           X   COPY public."BikeOrders" (id, id_bike, id_basket, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    245   ��       {          0    53399    Bikes 
   TABLE DATA           �   COPY public."Bikes" (id, id_type_bike, id_category_bike, name, price, model, brand, description, img, "inSell", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    237   ��       y          0    53392    CategoryBikes 
   TABLE DATA           M   COPY public."CategoryBikes" (id, name, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    235   u�       s          0    53359    CategoryParts 
   TABLE DATA           M   COPY public."CategoryParts" (id, name, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    229   �       m          0    53326    CategoryServices 
   TABLE DATA           P   COPY public."CategoryServices" (id, name, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    223   g�       �          0    53449 
   PartOrders 
   TABLE DATA           X   COPY public."PartOrders" (id, id_part, id_basket, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    243   ܬ       u          0    53366    Parts 
   TABLE DATA           �   COPY public."Parts" (id, id_type_part, id_category_part, name, price, model, brand, description, img, "inSell", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    231   ��       i          0    53306    Refresh_tokens 
   TABLE DATA           \   COPY public."Refresh_tokens" (id_user, refresh_token, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    219   ?�                 0    53432    ServiceOrders 
   TABLE DATA           ^   COPY public."ServiceOrders" (id, id_service, id_basket, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    241   \�       o          0    53333    Services 
   TABLE DATA           �   COPY public."Services" (id, id_type_service, id_category_service, name, price, description, "inSell", img, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    225   ��       w          0    53385 	   TypeBikes 
   TABLE DATA           I   COPY public."TypeBikes" (id, name, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    233   ��       q          0    53352 	   TypeParts 
   TABLE DATA           I   COPY public."TypeParts" (id, name, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    227   ��       k          0    53319    TypeServices 
   TABLE DATA           L   COPY public."TypeServices" (id, name, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    221   =�       h          0    53298    Users 
   TABLE DATA           m   COPY public."Users" (id, name, email, password, role, adress, surname, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    218   ѷ       �           0    0    Baskets_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Baskets_id_seq"', 46, true);
          public               postgres    false    238            �           0    0    BikeOrders_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."BikeOrders_id_seq"', 45, true);
          public               postgres    false    244            �           0    0    Bikes_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Bikes_id_seq"', 11, true);
          public               postgres    false    236            �           0    0    CategoryBikes_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."CategoryBikes_id_seq"', 3, true);
          public               postgres    false    234            �           0    0    CategoryParts_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."CategoryParts_id_seq"', 2, true);
          public               postgres    false    228            �           0    0    CategoryServices_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."CategoryServices_id_seq"', 2, true);
          public               postgres    false    222            �           0    0    PartOrders_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."PartOrders_id_seq"', 34, true);
          public               postgres    false    242            �           0    0    Parts_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Parts_id_seq"', 15, true);
          public               postgres    false    230            �           0    0    ServiceOrders_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."ServiceOrders_id_seq"', 22, true);
          public               postgres    false    240            �           0    0    Services_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Services_id_seq"', 5, true);
          public               postgres    false    224            �           0    0    TypeBikes_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."TypeBikes_id_seq"', 7, true);
          public               postgres    false    232            �           0    0    TypeParts_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."TypeParts_id_seq"', 5, true);
          public               postgres    false    226            �           0    0    TypeServices_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."TypeServices_id_seq"', 3, true);
          public               postgres    false    220            �           0    0    Users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Users_id_seq"', 22, true);
          public               postgres    false    217            �           2606    53425    Baskets Baskets_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Baskets"
    ADD CONSTRAINT "Baskets_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Baskets" DROP CONSTRAINT "Baskets_pkey";
       public                 postgres    false    239            �           2606    53471    BikeOrders BikeOrders_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."BikeOrders"
    ADD CONSTRAINT "BikeOrders_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."BikeOrders" DROP CONSTRAINT "BikeOrders_pkey";
       public                 postgres    false    245            �           2606    53406    Bikes Bikes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Bikes"
    ADD CONSTRAINT "Bikes_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Bikes" DROP CONSTRAINT "Bikes_pkey";
       public                 postgres    false    237            �           2606    53397     CategoryBikes CategoryBikes_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."CategoryBikes"
    ADD CONSTRAINT "CategoryBikes_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."CategoryBikes" DROP CONSTRAINT "CategoryBikes_pkey";
       public                 postgres    false    235            �           2606    53364     CategoryParts CategoryParts_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."CategoryParts"
    ADD CONSTRAINT "CategoryParts_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."CategoryParts" DROP CONSTRAINT "CategoryParts_pkey";
       public                 postgres    false    229            �           2606    53331 &   CategoryServices CategoryServices_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."CategoryServices"
    ADD CONSTRAINT "CategoryServices_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."CategoryServices" DROP CONSTRAINT "CategoryServices_pkey";
       public                 postgres    false    223            �           2606    53454    PartOrders PartOrders_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."PartOrders"
    ADD CONSTRAINT "PartOrders_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."PartOrders" DROP CONSTRAINT "PartOrders_pkey";
       public                 postgres    false    243            �           2606    53373    Parts Parts_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Parts"
    ADD CONSTRAINT "Parts_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Parts" DROP CONSTRAINT "Parts_pkey";
       public                 postgres    false    231            �           2606    53312 "   Refresh_tokens Refresh_tokens_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public."Refresh_tokens"
    ADD CONSTRAINT "Refresh_tokens_pkey" PRIMARY KEY (id_user);
 P   ALTER TABLE ONLY public."Refresh_tokens" DROP CONSTRAINT "Refresh_tokens_pkey";
       public                 postgres    false    219            �           2606    53437     ServiceOrders ServiceOrders_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public."ServiceOrders"
    ADD CONSTRAINT "ServiceOrders_pkey" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."ServiceOrders" DROP CONSTRAINT "ServiceOrders_pkey";
       public                 postgres    false    241            �           2606    53340    Services Services_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Services"
    ADD CONSTRAINT "Services_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Services" DROP CONSTRAINT "Services_pkey";
       public                 postgres    false    225            �           2606    53390    TypeBikes TypeBikes_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."TypeBikes"
    ADD CONSTRAINT "TypeBikes_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."TypeBikes" DROP CONSTRAINT "TypeBikes_pkey";
       public                 postgres    false    233            �           2606    53357    TypeParts TypeParts_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."TypeParts"
    ADD CONSTRAINT "TypeParts_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."TypeParts" DROP CONSTRAINT "TypeParts_pkey";
       public                 postgres    false    227            �           2606    53324    TypeServices TypeServices_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."TypeServices"
    ADD CONSTRAINT "TypeServices_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."TypeServices" DROP CONSTRAINT "TypeServices_pkey";
       public                 postgres    false    221            �           2606    53305    Users Users_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public                 postgres    false    218            �           2606    53426    Baskets Baskets_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Baskets"
    ADD CONSTRAINT "Baskets_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public."Baskets" DROP CONSTRAINT "Baskets_id_user_fkey";
       public               postgres    false    4779    239    218            �           2606    53477 $   BikeOrders BikeOrders_id_basket_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."BikeOrders"
    ADD CONSTRAINT "BikeOrders_id_basket_fkey" FOREIGN KEY (id_basket) REFERENCES public."Baskets"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."BikeOrders" DROP CONSTRAINT "BikeOrders_id_basket_fkey";
       public               postgres    false    239    4801    245            �           2606    53472 "   BikeOrders BikeOrders_id_bike_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."BikeOrders"
    ADD CONSTRAINT "BikeOrders_id_bike_fkey" FOREIGN KEY (id_bike) REFERENCES public."Bikes"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public."BikeOrders" DROP CONSTRAINT "BikeOrders_id_bike_fkey";
       public               postgres    false    4799    245    237            �           2606    53412 !   Bikes Bikes_id_category_bike_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bikes"
    ADD CONSTRAINT "Bikes_id_category_bike_fkey" FOREIGN KEY (id_category_bike) REFERENCES public."CategoryBikes"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public."Bikes" DROP CONSTRAINT "Bikes_id_category_bike_fkey";
       public               postgres    false    235    4797    237            �           2606    53407    Bikes Bikes_id_type_bike_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Bikes"
    ADD CONSTRAINT "Bikes_id_type_bike_fkey" FOREIGN KEY (id_type_bike) REFERENCES public."TypeBikes"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Bikes" DROP CONSTRAINT "Bikes_id_type_bike_fkey";
       public               postgres    false    233    237    4795            �           2606    53460 $   PartOrders PartOrders_id_basket_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PartOrders"
    ADD CONSTRAINT "PartOrders_id_basket_fkey" FOREIGN KEY (id_basket) REFERENCES public."Baskets"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."PartOrders" DROP CONSTRAINT "PartOrders_id_basket_fkey";
       public               postgres    false    239    4801    243            �           2606    53455 "   PartOrders PartOrders_id_part_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PartOrders"
    ADD CONSTRAINT "PartOrders_id_part_fkey" FOREIGN KEY (id_part) REFERENCES public."Parts"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public."PartOrders" DROP CONSTRAINT "PartOrders_id_part_fkey";
       public               postgres    false    231    243    4793            �           2606    53379 !   Parts Parts_id_category_part_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Parts"
    ADD CONSTRAINT "Parts_id_category_part_fkey" FOREIGN KEY (id_category_part) REFERENCES public."CategoryParts"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public."Parts" DROP CONSTRAINT "Parts_id_category_part_fkey";
       public               postgres    false    231    229    4791            �           2606    53374    Parts Parts_id_type_part_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Parts"
    ADD CONSTRAINT "Parts_id_type_part_fkey" FOREIGN KEY (id_type_part) REFERENCES public."TypeParts"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public."Parts" DROP CONSTRAINT "Parts_id_type_part_fkey";
       public               postgres    false    231    4789    227            �           2606    53313 *   Refresh_tokens Refresh_tokens_id_user_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Refresh_tokens"
    ADD CONSTRAINT "Refresh_tokens_id_user_fkey" FOREIGN KEY (id_user) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public."Refresh_tokens" DROP CONSTRAINT "Refresh_tokens_id_user_fkey";
       public               postgres    false    219    218    4779            �           2606    53443 *   ServiceOrders ServiceOrders_id_basket_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ServiceOrders"
    ADD CONSTRAINT "ServiceOrders_id_basket_fkey" FOREIGN KEY (id_basket) REFERENCES public."Baskets"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public."ServiceOrders" DROP CONSTRAINT "ServiceOrders_id_basket_fkey";
       public               postgres    false    239    241    4801            �           2606    53438 +   ServiceOrders ServiceOrders_id_service_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."ServiceOrders"
    ADD CONSTRAINT "ServiceOrders_id_service_fkey" FOREIGN KEY (id_service) REFERENCES public."Services"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public."ServiceOrders" DROP CONSTRAINT "ServiceOrders_id_service_fkey";
       public               postgres    false    225    4787    241            �           2606    53346 *   Services Services_id_category_service_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Services"
    ADD CONSTRAINT "Services_id_category_service_fkey" FOREIGN KEY (id_category_service) REFERENCES public."CategoryServices"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public."Services" DROP CONSTRAINT "Services_id_category_service_fkey";
       public               postgres    false    223    225    4785            �           2606    53341 &   Services Services_id_type_service_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Services"
    ADD CONSTRAINT "Services_id_type_service_fkey" FOREIGN KEY (id_type_service) REFERENCES public."TypeServices"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."Services" DROP CONSTRAINT "Services_id_type_service_fkey";
       public               postgres    false    4783    225    221            }   N  x��WI�1<���{0�H�zK��C� ��0�B�G!��-w�r𭺪�E��3˿����ӏ�Ӑ�����K�b�D_���1dhh�%�\Qd.�1ބ�Clm�TV�dS��!وZH�_A1��C�6��ʜ!��A5���f=iiZ�:��p�L�5t�Eh��b�C�d�=�Q�4��uBణ�o.۠T㊼� ��4��͑u����<:� ��#7D��|�PC��ѡG�s�r ��2@z�����9������|��-����-�.z:QNR���!�|�є6ІDb�iƓ'RIa�������"7��uY4sS[J��nX@AL)�xb�h����X@Q<����,9�v�]Ww����8>�����=�Ԏ�l���
���ڨ�͡�N��N�b&�44_l������Ѝt�N���?[�V�UXkҎ$y�o�Z��1�z�H&�ц��\<�����6ݰ�;1��dF�}x]��NX�c�_�2�D�I�)k��X�ILG\��� �l�DT�y��wSE�����xo���$��-#a�z|ϙ.�����o֎|��3M��' �X�Z1;x�&M��d^vG��a�X�y�/uk%:�͔�W!^�vI����i��:�r6�S��fL~�Wܕ�����\C�u��t�Zw,N<�<=z��|S�$�WNWl�]@�k����4�,(�ۨ���[J4�pT
س �9Щ8��'�]8�7/���x�3}�4���X�x�f�Z�5��)�w���Ƚ!ʫ &X��C3=�γ,D1=�rj�es��{ԭ[�κ��$�j"�����|� � ��m      �     x�}�I��0E����(B�|���9�i���]���Ȳ�MdӢ�-�-�Ku���ʳ˟b� �M
�;�(�OD�	�k5,��|S,O�i���流���+�������X
HzEԳb,O{��#G��ݹ:�_�fv����/Dql�=~��^���^E�3o�w�>�~"͞!{p����X���m>�}"���.�V�~!�}��r�������ۜ��
T��P�5v%�	� ��9���@� �e��q)8��Ƭ<����Q$�؎�B;eE����BFl�ioBjy]H���P�D�Y6�l��ָnh?�"�-[�"����� Ҟ-�{H5���B��N���,��\�<��3f�.� ��kv���(�L�-���4oٱ &�Q\Wt�ֶ��d�h/-��Xkz7\���r��m��ݜ��&d�R{����/D�(�+׊��Q�����[��eEdǰA���^[y�5h��� ʊ�e�����%��5��G�������<@{��ϝzG�5��������e"����j      {   �  x��[Ko�>/E��ᬦ罼-%R�i��zD�evw6fD�E��M$MK�d~ Nǖ}�Zr����v��I��{f��C.%�A0a��3=��U��U���x�(U�j��J���O����\���_�����q����O��]F�����������q�5�[�X�n���~�]Y�ւe������i`�n��	��D�d�=�e��wa���n���X�~#��b��7`F)��)_������g��ma��	��"��V�#pۧ���w�n�_��)F��C�de^;3{,���uh#:>�U<7§�C1�!�����3|�{�b�3u���C0�fۇ�����=v�_n�����>���k�����3\\^����]4&�^0�K�v�=���}���.L��7�m�-M�6qy������M(�q�i3�(&��� ���=x���b�m��~3X��h�ᅯhV|�G�ƹD��`�u�7�#�?!�:bk��X2,�Y\�Y���>�H��]|W'����\�qw�c(�KMx�F��|�05��]��-]�xV��.z�/w�\Z+�aQ�U�����=���n�24b@���������~�� NJs+�w�e� ƆH���"�.�v�����^��q��2������엇_�kZ}տ���1=wk��ڽDʣݔ������m��M�3�2ZM9|���h�Oh���o�'sh�`�)��8��l��Ep�
�Y�u/��n�W`?�L��^'�� |�L�FNI��+Bc2n0Yd9���c?������[�x��Oc�`X�H[�2�#���0s6!�(�!]>��ژ&`�3�d��~���83]7M�K�E��Ocd�nPJ�)�qGƘGH
-���e��r�7�i؁f���Yu���u��<_o��p��+��2ƹQ6Q�1K��|uffr�M����_�����U<�vTu~�*��\�����;9�Ƭ�X���M>˩�5������ ��?� �E�����!r0�Z����/��_�~�c.x�Wx��۔������Ԩ �u�1d+�m�m̵Ga��% ���A��Y~��,�Y׼��5�1��5Z��=u���S�X�"LC#V	�K��y61=3�f��������4zz���b����K*�Nx�;���u��������ˀ&���2"3Ft��������Ǭv��-�I���8=��B\�n�����8�֨�<p;�N��;J��!�?S�z_����|Ic2��柨p]jAJ�,��[ⅈR00�uT����c�&�s�puu��`�-�,-6������)�?��;ė�@����E�-+J�O�R���[p�	��i@�zڽ�A�K��-/�E($���VWؼ�T�֯`�mJ.pC�({r�h�ML(b�&����FLL���we�M]����� 3}���m�f�����L�"�:ֈ$��O�N$eX.��+�U�`�r<Hg�55�������nP��θa�]�P�sbh�&ڙ���V٭ɉ�j�d�-�����8��e�白�b�,}����%{y����EE���'�cx��a��E�J��RxC�0P
K=MEEi>~S��.\6/Z�j�G�O��H|%����P�	,��jx,���%��sXr]�u!�>P��������*��])v�ɲ]�W����)b7�2��#����tڃ�prF���Hq$5�7�X��A���'v��g���l�y�M��#:�S��퐻�G��x&���/�oV�%s�1�3��+����2�+���}�	�T!atR�UA��pKD��Q ��g�u�|�p�	�s��|�i�a[n�lx���Fta��*
DO�8%���7��Xm�zqr�� ף�abʁ���7�l�#$J�6�(��ݓ��ē�)��Y�R�m� ^�4ڔ�=Y(d���� I��KZ��( �����ʽ[k��`zg�(d��b��R�R���� V��"P�-8u㒪��Cn�x`%{j	�]�m�Li��W\�&%&a$/5T(�:Qsk�]�8F�(�	.�ܯ/��h.lq^垣��y��{T*�R,1�bsFg����a�!�/*9���A{:ܖA�$�m�t� ��h+���x�̥)�圖�a(f �	t�v��h�W�[:	�A�!|J����-p��WYz�$�7Hr(<ZH�,���H�j�߳�6�^,."K�-�q�示���+�l�f�\����D&#Bl�%\��;�-??�X �	l;�j��N�$�Cj'X������z�^v;�9ǽ��M(-����3�cq�\�v�7�	\�,�74�7��T*�f�ӹn�;ٶ��j���\�q�N�;�ւզ�e�%�~I<���}�up�V_� �%�Ē��ϩ�LXhq3ͱ!�C���K�3�#ޥ��=���@���:T1J�WU�#zJ���ZuOqi�MI!J�CX'�j���:���
����E!�h�Џ��\� j$S�o������4�@Q����D�ć�W�j$�I� �c��M�o٥���UV7�\�����Evs^�꼰�tFC8����<N�E�;�P�����(9
UTP�g��^e����'�q1�!An���¥+�����s�hōc�m�>/hK�����w�xQؤH5�
E�^RN�C;�c�*�vZ��L��/Eyue9X�X�g��k��s�M��Ǥ�)�7�Oэ��-��{�o\y
�#pm'j�-�W���d�q�m���c�|;�r��Vd)~<��h8.���	�nv#h��C;���j���5u���RUs]�-C;s�n	կ<�fс��y'�P:�fSW54e��I��x�����C���z?��y�To4[�k�8���V��-��|��*M��u����1nxe��
���!8U�s+w}(	F>P�S߯ț~��s�3�榮ac0�f�)'�,��S�Kt'?�?0@�v���1N^�@)�G��Х��w�諄��' 9���Q6dVb<'�) o1�Kt��g�(þK�u$?��%K|m��$�����ə���"��L�� �R����I�Ǽ@g˒BIF��s�+�j-7`�nZ|��̈������k�O�JuH�&���t]�S�ws�"K����������CD�>��+��l�1�"��l���`��ODA@�]�9�����+��*���.�o.X|�{���?�P3b�'��ѹ}�<Χ���+�3�8��+>jӗH򬉲@�R��>��B�����]�cK�/qf�U8���Y�~d$�0��+���o��e��*Q)Ql�Ӹ,K/�ZX�����3���ۦ�����*:`9�1ꞯ5��on�3Z-�^q�z�7\G7�,k�C�n���eC#���U�q⑗�T�;�r�86���:6�0Ss�)I[Ĉ�ɚ0!��v1bMB� ��.m[�$����f�f�0p��k��T}��X�.�^VRH(C qvs�������*K*'1i�fzÖ�g;��̋6��;Q��(���qD�<ah�^��PF_O�$�A!1�Y�����v�V���3����
��ʷ������ȏ����/���J�3{�o�C���O=R�gڃ�S!�o�I~�-h��z�<F*oQe���Ifl���DA[��?�m'J�V�|3gƭ��ϩ\�&)����*�H@(z*6| �����N7�e1�-̒mřQB�5�/ʏ	!��]Q/�����C�m�~�b&�Y҆����p�T�y�i��eV�r��V�����j6��lhg�t˺��"394����1x�0�g.6�K�K�K�K�K�K����N�n6MO�[nK�*��yM��ʩ�yˮ{zK�I��s�츪c����%����y����Ե���J<�Ĩ�Ki2+B��m�d�ZK�v���ٞfqX��R��|϶�FŬ;�%:�|�v�M�l�Nr	���?�GFF��4�-      y   m   x�3�0���{/6^�uaǅ��FF&��F���
��V�V�fz�FF��x���8/̹�|aؘ}،12�30��j\�˘�[/6�p��9H���)�1�R\1z\\\ �d>�      s   e   x�3�0�b߅�v\l�����=/캰�b?��������������������������1).#�/쿰�b��6]؋�0#c=����b����  5�      m   e   x�3�0����/l����^N##]C#]CK#+C+c#=scmc<R\F��]�qaӅ�.l��x��bÅ��/l��fb�gjd��D�W� O</�      �   �  x�}�Kn�0DתS�~ЄH�u���#�G�KzՏ�袬���_��Q���c6s���R��/�˶*�/��r~V�]F-D�r���!�gn_%t*�J�J����iV�iQ�D��:�An�MlC������u._��M��fv�a�p{e�(�/Uo\�%eZ�j,d�~���]��lC�EC��Ԥ���'��P�}&[o���!hYm39I���A�7����� �|1��-�x.Cz�E�%�F.��;�5���,��_}���ވ�!�t(��d����`A_��iE������v�H��!�-�x��ڣ�E`���;�-�`~���Z�85J/df;��EFm�����xS����lx���Z>*_~p�H���7Bҳ��$eGHv�{#_�!yΨ�V�Ͼ�b�����?��|K      u   �  x�����E��ާ�u�>�sBp@FB�==�>�Z���9!�p�3B�}~��7�fv�·��4�lլ��W��
Y�B�h��ۧ�JGj����V]����/�W���W[y���i;�&���j;����\�ϔpͭmX'r:OPb�
�)�o�~��)�Ic���B��N
��%cIj�U�>��Φ��9	4�B�CL�?����|�A�Hc�H����B�Sâ��J)5B��e+�<v@ÀhlXR>����EQ�;��+�&���1HE�5]�/�Zs�&a��@dйh���i������T����Zm������(�����X�I�[�dثj�7�v�+���,�,�V�՝�j�����8q���8�]�O�c}¦S)ms���yM�U �΢�Ӻ�F�:�i`0~��&.�⺥��W��>Whb��u���u:���hCqn�}\?p0��}\��	�����i�<���7�M��Cj�j.RC��������uX }�+CC�	Hz�y��$��������q�N�7QᝯV���1��b�B���}�.�0a՜e�l���86��کp��r�^�*�&ߡ�5M�Kj��*N��"�8��;��
.VW�V�c_��G�!= Љ&ԅ�y�I��=�I���Qa��%^U��&<>�������(g?�Q��5�,i0
���]��n�t��9B(s�@H+��ӻ��P��8D��I�s9;��YL"�O�Q�f9��o�<r�:�ca��E�f1�O��8?�n��~'��v5k�SNͿ���k���/W�E��z+Q":��k����:p��8�Չ����8Q���S"d���؅��.\�C|���Y��1�f��e�����[E҈��q��g��.P�%�1 K'����.`(Ŏ1{2�p�4���ob��      i      x������ � �            x�u�I��0��+r�7-~���C�h�6�[�`�lF��_U��e�T��4����LH�a���`�Dd%�<�����磥W��O��(V�q��C��v o�Zq,+��X>�"X6����!��q��C�%д7D3Weϑ�ODRsWvL���H������6D�Mc;S��ODbk�_A�Üձ}!_�voxj"��pdOy���HZ���$2�}{C��a���5���ˌ<��+]�d%�Z��"]I{�� !�����K�KZ�������߈~��� &�      o     x��SKn�0]S�о���Pu�n�-�U>�� m��M���[ǵ'��+o�!6BdY#g�>C�$S���Ǔ_��^��P������{���'���8��7��s<�k|���a+V6R��nz�p�����8ހ�`�V8!��3%p��t����҅x#�R�b���8�)�ĈH���#�I"os���#n���XO!�5�'��]N5S�ʩ��Q#b������ƦѮU\����ے��ޘ��m);�%E�jpE�LB��T��8�n��.����g|dZ�oxd�HN�i6�X^�,8Z#UJ�F/|�N9��PV���u�n��:��t�WM7pg�J�al�t	=�'\a��r�e2�Q��~���zX�
�g��|�"q"�X�<g���-��@�����4���+E#=�$OYkU8�	��UQ�����4z�§�K"�H�l��|?��33�~��5�OL�Չ��B� �zcyߛN�Q�֪]kWua��9��,����Ȳ�/,"8"      w   �   x�}�?�0��~�p74mi�etww�0��0^��/\��FB��5����'�h}�/4��7SB�D�D��t�0��\)��D��4�~H���٨dD�2\Ѡ�O_�=Jԑ�噉�i����?��L�Eꢲ�a���;`si���DY&�R�7ͯ��V�Dם ��5U��:�҅�c�W��RU��v��>�w��      q   �   x�}���0Ek��Q,�|N�ga葐(�`�XB���7��X����?�pF�zņ��\ۮb�	��Vxe�D�p1�0�^
k�(Y9�n�"bL{���Z�4e͌H�Y3�^��}S�Y����y��1�b���<.��� F;Sj�@��D��mz      k   �   x�}�1
�@D���H\��]5�,^F�@��#�`=��EVY��x3�a�V,Zi��޴F�-f�q���'q�{+!?;�H:L���u�y�A$.�y�'��G^�1�ǲ���Js�qԷ*-}K`      h   �  x���K������Sx�]j��ZEOP#�^HH�$��X9��$UI�8�Ej2Y�"UY�t����3�o����tZ�$ʪ�����=�X���>}�~���|�i�����j�	�3^;����U�f���$���M�VC6Z�b����v�YMy%�e,�CN�!���X�M������cz���ѯ�g��g ���'���&}���� ��=�2Ŗ�C��A���P�ҿ��w��=��������H�f{��vՉ�M��Z]ŮΦ.�pL7VH�����5Z>��_��M��_�wO3.��i����T K_��r�<ݠ ��/��k:;me��L��KN:T2��Ue��W���V��M	���^���@�#�e^����&+T�>;�'��D�Du 9%zl*d~~�B���pg��i��O�<\�7��f��9��嶲��2V"1"��\q�W]c뎋�ޞ*�yF1P#���{y���<e@����|6 �P�ǯ��Io0��ۮ{�i�p�RpQ�����}��}�د\u�\�TA;P�xbq��KJ�
�{�`^�]����I�T�(��-�|Bq���g����H�!��M�[n�c�p:�.\Er5$c>^�;W�XzZ�+è�j������g8y t��8`�#S 5�C��[49�!8$�N3�R��h�\f�|/֊&~�-3�KS�[�É
^�:�F=oχ�EZ�H��/ӷ�ç)�e��94�L�a��u65��� �W�9��jT��y~�[ќ�Q�t�Qi��Zñ�~��\یj5�O4�j@��I�rX�2�R�L?6 ��F����ט���y���#�ԩ:��q)�p�Lm�J^�o5F>ϵ�+�����[{�<�V�K8��|{R�\��Q.�gS�t�5��mZ�53t�ua3/�����]�ؾ,PB<�yӫ>�Uc�ř4���m�����^#�9˒*�t~��� �9;�:��^���.�ZW�N`ĳ��[nMHɱЊT %�Qg����q$��E��Ջ��;��MΠ��!�4�����Kd��q�������W�\	m	�{�S�j�9�Vh��V���2���/��l1��q�i�}�1��s�թ����_F$[A�+C�2]�{&^�|�)gO2?�K�3� \h�9�,/k�j��eM�%�v\.BkҮƓ�R����SiU}u%q�ˈ�C���L|�Ґe��4G��p8Af4TV�S��p�4���)j&3V���g��N�z���Mn�f����â�ojm[�{�[����c^F���?QO~8~���Pt6��_��<\+��ԽE�m�IN�m7�`��LNԤ�;xS]C�sX���èH���K�^4#�A�gp��Ѝ�%z�?R��(h�!N&��Y�T@�t��=mb�D�}Į���0�3��rR��k�1�V�S퉬�G�(��Ӗ�ᴡ�Y����d������(C���B��`8�<T��+�&�Y����9��D�}E���2�F�r�d�"�pN���hc�2b�L�K|�t�F��'[<^"ӛ���,,N�y�3L�`N,,�����,�6�L�9�}N�B]7NŢ��J�U|A54��PX��λU�������ػ���9�tЗ����9a��J�N�"�'�Z��-�=V����s�n�[�oUc��t�kz���-�m�V�8�AB%Ug9��T�
*
���eHߞv��ݻ�E��f	iB� ��Gͩ��_��B�_�77[     