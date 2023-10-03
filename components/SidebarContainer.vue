<script setup>

const linkList = [
    {
        label: "Sesión en línea",
        link: "#",
        hasCode: false,
    },
    {
        label: "Plataforma de estudios",
        labelCode: "Cód. activación",
        code: "12345",
        link: "#",
        hasCode: true,
    },
    {
        label: "Matrícula",
        link: "#",
        hasCode: false,
    },
    {
        label: "Evaluación TOEIC",
        link: "#",
        hasCode: false,
    },
]

const sidebarMenuList = [
    {
        label: "Inicio",
        icon: "icon-home",
        hasSubMenu: false,
    },
    {
        label: "Mi curso",
        icon: "icon-book-open",
        hasSubMenu: true,
        subMenu: [
            {
                text: "text",
                direction: "#",
            },
            {
                text: "text",
                direction: "#",
            }
        ]
    },
    {
        label: "Finanzas",
        icon: "icon-creditcard",
        hasSubMenu: true,
        subMenu: [
            {
                text: "text",
                direction: "#",
            },
            {
                text: "text",
                direction: "#",
            }
        ]
    },
    {
        label: "Networking",
        icon: "icon-user-chat",
        hasSubMenu: true,
        subMenu: [
            {
                text: "text",
                direction: "#",
            },
            {
                text: "text",
                direction: "#",
            }
        ]
    },
    {
        label: "Beyond WETALK",
        icon: "icon-puzzle",
        hasSubMenu: true,
        subMenu: [
            {
                text: "text",
                direction: "#",
            },
            {
                text: "text",
                direction: "#",
            }
        ]
    },
]

</script>

<template>
    <div class="w-[275px] bg-[#E6F0FF] px-7 py-9">
        <FastLinks :links="linkList" />
        <SidebarMenu :links="sidebarMenuList" />
    </div>
</template>