Data = {
    Average: { AbilityScores: {Strength: 10, Dexterity: 10, Constitution: 10, Intelligence: 10, Wisdom: 10, Charisma: 10},
        Profs: [],
        Color: {r: 250, g: 0, b: 0}
    },
    Mara: { AbilityScores: {Strength: 15, Dexterity: 15, Constitution: 16, Intelligence: 11, Wisdom: 13, Charisma: 16},
        Profs: ["Intimidation", "Nature", "Religion", "Survival"],
        Color: {r: 179, g: 181, b: 198}
    },
    Kensi: { AbilityScores: {Strength: 8, Dexterity: 14, Constitution: 17, Intelligence: 12, Wisdom: 17, Charisma: 11},
        Profs: ["Arcana", "Deception", "Insight", "Investigation", "Perception", "Religion"],
        Color: {r: 51, g: 238, b: 70}
    },
    Bakhul: { AbilityScores: {Strength: 10, Dexterity: 16, Constitution: 14, Intelligence: 18, Wisdom: 11, Charisma: 13},
        Profs: ["Arcana", "History", "Investigation", "Sleight of Hand"],
        Color: {r: 106, g: 52, b: 192}
    }
    // Todo: Add other's scores ONCE THEY GIVE THEM TO ME....
};

abilityList = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
skillsList = [
        "Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception",
        "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception",
        "Performance", "Persuasion", "Religion", "Slight of Hand", "Stealth", "Survival"
    ];
skills = {
        "Acrobatics": "Dexterity",
        "Animal Handling": "Wisdom",
        "Arcana": "Intelligence",
        "Athletics": "Strength",
        "Deception": "Charisma",
        "History": "Intelligence",
        "Insight": "Wisdom",
        "Intimidation": "Charisma",
        "Investigation": "Intelligence",
        "Medicine": "Wisdom",
        "Nature": "Intelligence",
        "Perception": "Wisdom",
        "Performance": "Charisma",
        "Persuasion": "Charisma",
        "Religion": "Intelligence",
        "Slight of Hand": "Dexterity",
        "Stealth": "Dexterity",
        "Survival": "Wisdom"
    };

getModifier = (score) => Math.floor((score-10)/2);

function buildUserSkills(userData){
    userData.Skills = {};
    for (var i = 0; i < skillsList.length; i++) {
        userData.Skills[skillsList[i]] = 10 + getModifier(userData.AbilityScores[skills[skillsList[i]]]) + (userData.Profs.includes(skillsList[i]) ? 2 : 0);
    }
}

function buildAbilityDataSet(userData){
    var c = userData.Color;
    var abilityScores = [];
    for (var i = 0; i < abilityList.length; i++) {
        abilityScores.push(userData.AbilityScores[abilityList[i]]);
    }
    return {
        backgroundColor: `rgba(${c.r}, ${c.g}, ${c.b}, 0.2)`,
        borderColor: `rgba(${c.r}, ${c.g}, ${c.b}, 1)`,
        data: abilityScores
    }
}

function buildSkillDataSet(userData){
    var c = userData.Color;
    var skills = [];
    for (var i = 0; i < skillsList.length; i++) {
        skills.push(userData.Skills[skillsList[i]]);
    }
    return {
        backgroundColor: `rgba(${c.r}, ${c.g}, ${c.b}, 0.2)`,
        borderColor: `rgba(${c.r}, ${c.g}, ${c.b}, 1)`,
        data: skills
    }
}

function makeAbilityGraph(data){
    var abilityData = {
        labels: abilityList,
        datasets: data
    };
    var ctx = document.getElementById("ability-scores").getContext("2d");
    myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: abilityData,
        options: {
            maintainAspectRatio: true,
            responsive: false,
            scale: {
                ticks: {
                    suggestedMax: 18,
                    suggestedMin: 6
                }
            }
        }
    });
}

function makeSkillGraph(data){
    var skillData = {
        labels: skillsList,
        datasets: data
    };
    var ctx = document.getElementById("skills").getContext("2d");
    myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: skillData,
        options: {
            maintainAspectRatio: true,
            responsive: false,
            scale: {
                ticks: {
                    suggestedMax: 15,
                    suggestedMin: 8
                }
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    var abilityData = [];
    var skillData = [];
    for (var user in Data) {
        buildUserSkills(Data[user]);
        var userAbilityData = buildAbilityDataSet(Data[user]);
        var userSkillData = buildSkillDataSet(Data[user]);
        userAbilityData.label = user;
        userSkillData.label = user;
        abilityData.push(userAbilityData);
        skillData.push(userSkillData);
    }

    makeAbilityGraph(abilityData);
    makeSkillGraph(skillData);

});
